import { useState, useEffect } from "react"
import { Repo } from "../../types"

type Result =
  | { type: "Loading"; loading: true }
  | { type: "Loaded"; repos: Repo[] }

export const useRepositories = (): Result => {
  const [result, setResult] = useState<
    { ok: true; data: GitHubRepositories } | { ok: false; error: any } | null
  >(null)
  useEffect(() => {
    useInstalledRepositories()
      .then((data) => setResult({ ok: true, data }))
      .catch((error) => setResult({ ok: false, error }))
  }, [])

  if (!result) return { type: "Loading", loading: true }

  if (!result.ok) throw result

  return {
    type: "Loaded",
    repos: result.data.repositories.map((repo) => ({
      name: repo.name,
      owner: repo.owner.login,
      defaultBranchName: repo.default_branch,
    })),
  }
}

type GitHubRepositories = {
  repositories: [
    { owner: { login: string }; name: string; default_branch: string },
  ]
}

const useInstalledRepositories = async (): Promise<GitHubRepositories> => {
  const res = await fetch(
    "https://api.github.com/user/installations/9903615/repositories",
    {
      headers: {
        Authorization: "token 15858b40eb82bb6cc75531ad8b410e219e25c8f8",
        Accept: "application/vnd.github.machine-man-preview+json",
      },
    },
  )

  if (!res.ok) {
    throw res
  }

  const json = await res.json()
  return json
}
