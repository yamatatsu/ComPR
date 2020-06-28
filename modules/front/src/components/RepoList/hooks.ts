import { useState, useEffect } from "react"
import { Repo } from "../../types"
import { fetchInstalledRepositories } from "../../lib/apiClient"

type Result =
  | { type: "Loading"; loading: true }
  | { type: "Loaded"; repos: Repo[] }

export const useRepositories = (): Result => {
  const [result, setResult] = useState<
    { ok: true; data: GitHubRepositories } | { ok: false; error: any } | null
  >(null)
  useEffect(() => {
    fetchInstalledRepositories()
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
