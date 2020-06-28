let token: string | undefined = process.env.token_for_debug

export function setToken(_token: string) {
  token = _token
}

type GitHubRepositories = {
  repositories: [
    { owner: { login: string }; name: string; default_branch: string },
  ]
}

export const fetchInstalledRepositories = async (): Promise<
  GitHubRepositories
> => {
  if (!token) throw new Error("no token yet")

  const res = await fetch(
    "https://api.github.com/user/installations/9903615/repositories",
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.machine-man-preview+json",
      },
    },
  )

  if (!res.ok) throw res

  const json = await res.json()
  return json
}
