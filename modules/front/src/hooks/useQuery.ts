import { useQuery as _useQuery, QueryHookOptions } from "@apollo/react-hooks"
import { DocumentNode } from "apollo-boost"
import { GQLQuery } from "../../schema"

type Result =
  | { type: "Loading"; loading: true }
  | { type: "Loaded"; data: GQLQuery }

export const useQuery = (
  query: DocumentNode,
  options?: QueryHookOptions<GQLQuery, Record<string, any>> | undefined,
): Result => {
  const result = _useQuery<GQLQuery>(query, options)

  const { loading, error, data } = result
  if (loading) {
    return { type: "Loading", loading }
  }

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error("No data is fetched")
  }

  return { type: "Loaded", data }
}
