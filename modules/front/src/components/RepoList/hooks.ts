import { gql } from "apollo-boost"
import { Repo } from "../../types"
import { GQLQuery } from "../../../schema"
import { useQuery } from "../../hooks/useQuery"

type Result =
  | { type: "Loading"; loading: true }
  | { type: "Loaded"; repos: Repo[] }
export const useRepositories = (): Result => {
  const result = useQuery(gql`
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

  if (result.type === "Loading") return result

  const repos = [...viewerRepos(result.data), ...orgRepos(result.data)]

  return { type: "Loaded", repos }
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
