import React from "react"
import { renderHook, RenderHookOptions } from "@testing-library/react-hooks"
import { MockedProvider, MockedResponse } from "@apollo/react-testing"
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-boost"
import introspectionQueryResultData from "../../../schema/fragmentTypes.json"
import { useRepoEntities, gqlGetRepoEntities } from "./hooks"

const renderHookOptions = (
  mocks: MockedResponse[],
): RenderHookOptions<unknown> => ({
  wrapper: ({ children }) => (
    <MockedProvider
      mocks={mocks}
      cache={
        new InMemoryCache({
          fragmentMatcher: new IntrospectionFragmentMatcher({
            introspectionQueryResultData,
          }),
        })
      }
    >
      <>{children}</>
    </MockedProvider>
  ),
})

const request = {
  query: gqlGetRepoEntities,
  variables: {
    owner: "test_owner",
    repo: "test_repo",
    expression: "test_branch:test_currentPath",
  },
}

describe("useRepoEntities", () => {
  test("get tree", async () => {
    const mocks = [
      {
        request,
        result: {
          data: {
            repository: {
              object: {
                entries: [
                  { name: "dir1", type: "tree", __typename: "TreeEntry" },
                  { name: "dir2", type: "tree", __typename: "TreeEntry" },
                  { name: "dir3", type: "tree", __typename: "TreeEntry" },
                  { name: "file1", type: "blob", __typename: "TreeEntry" },
                  { name: "file2", type: "blob", __typename: "TreeEntry" },
                  { name: "file3", type: "blob", __typename: "TreeEntry" },
                ],
                __typename: "Tree",
              },
              __typename: "Repository",
            },
          },
        },
      },
    ]
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useRepoEntities({
          owner: "test_owner",
          repo: "test_repo",
          branch: "test_branch",
          currentPath: "test_currentPath",
        }),
      renderHookOptions(mocks),
    )
    expect(result.current).toEqual({ loading: true })
    await waitForNextUpdate()
    expect(result.current).toEqual({
      loading: false,
      entities: [
        { type: "tree", name: "dir1", __typename: "TreeEntry" },
        { type: "tree", name: "dir2", __typename: "TreeEntry" },
        { type: "tree", name: "dir3", __typename: "TreeEntry" },
        { type: "blob", name: "file1", __typename: "TreeEntry" },
        { type: "blob", name: "file2", __typename: "TreeEntry" },
        { type: "blob", name: "file3", __typename: "TreeEntry" },
      ],
    })
  })
})
