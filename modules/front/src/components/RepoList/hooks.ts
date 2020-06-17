import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Repo } from "../../types"
import { GQLQuery } from "../../../schema"

export const useRepositories = () => {
  const { loading, error, data } = useQuery<GQLQuery>(gql`
    {
      viewer {
        login
        repositories(
          first: 20
          isFork: false
          isLocked: false
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          nodes {
            name
          }
        }
        organizations(last: 20) {
          nodes {
            login
            repositories(
              first: 20
              isFork: false
              isLocked: false
              orderBy: { field: UPDATED_AT, direction: DESC }
            ) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `)
  if (loading) {
    return { loading, error, repos: [] }
  }

  if (error) {
    return { loading, error, repos: [] }
  }

  if (!data) {
    throw new Error("No data is fetched")
  }

  const repos = [...viewerRepos(data), ...orgRepos(data)]

  return { loading, error, repos }
}

function viewerRepos(data: GQLQuery): Repo[] {
  const { login, repositories } = data.viewer
  const repos = repositories.nodes
    ?.map((repo) => {
      if (!repo) return
      return { owner: login, name: repo.name }
    })
    .filter(isNotNull)
  return repos ?? []
}

function orgRepos(data: GQLQuery): Repo[] {
  const repos = data.viewer.organizations.nodes
    ?.flatMap((org) => {
      return org?.repositories.nodes?.map((repo) => {
        if (!repo) return
        return { owner: org.login, name: repo.name }
      })
    })
    .filter(isNotNull)
  return repos ?? []
}

function isNotNull<T>(arg: T | undefined | null): arg is T {
  return !!arg
}
