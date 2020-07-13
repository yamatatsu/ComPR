import { Octokit } from "@octokit/rest"

let octokit: Octokit | undefined

export function setToken(token: string) {
  octokit = new Octokit({ auth: token })
}

type GitHubRepositories = {
  repositories: {
    owner: { login: string }
    name: string
    default_branch: string
  }[]
}

export const fetchInstalledRepositories = async (): Promise<
  GitHubRepositories
> => {
  if (!octokit) throw new Error("`octokit` is not initialized yet.")
  const res = await octokit.apps.listInstallationReposForAuthenticatedUser({
    installation_id: 9903615,
  })
  return res.data
}

export const commit = async (props: {
  owner: string
  repo: string
  baseBranch: string
  newBranch: string
  message: string
  path: string
  content: string
}) => {
  if (!octokit) throw new Error("`octokit` is not initialized yet.")

  const { owner, repo, baseBranch, newBranch, message, path, content } = props

  const resultOfGetRef = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${baseBranch}`,
  })
  const resultOfCreateRef = await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${newBranch}`,
    sha: resultOfGetRef.data.object.sha,
  })
  const resultOfGetContent = await octokit.repos.getContent({
    owner,
    repo,
    ref: resultOfCreateRef.data.ref,
    path,
  })

  const resultOfCreateOrUpdateFileContents = await octokit.repos.createOrUpdateFileContents(
    {
      owner,
      repo,
      branch: newBranch,
      message,
      path,
      content: new Buffer(content).toString("base64"),
      sha: resultOfGetContent.data.sha,
    },
  )

  return {
    resultOfCreateRef,
    resultOfGetContent,
    resultOfCreateOrUpdateFileContents,
    pullRequestUrl: `https://github.com/${owner}/${repo}/compare/${newBranch}?expand=1`,
  }
}
