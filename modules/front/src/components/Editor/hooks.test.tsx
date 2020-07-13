import React from "react"
import { renderHook, RenderHookOptions } from "@testing-library/react-hooks"
import { MockedProvider, MockedResponse } from "@apollo/react-testing"
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-boost"
import introspectionQueryResultData from "../../../schema/fragmentTypes.json"
import { useFileContent, gqlGetRepoEntities } from "./hooks"

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
    qualifiedName: "refs/heads/test_branch",
  },
}

describe("useFileContent", () => {
  test("get blob", async () => {
    const mocks = [
      {
        request,
        result: {
          data: {
            repository: {
              object: { text: "test_content", __typename: "Blob" },
              ref: {
                target: { oid: "test_oid", __typename: "GitObject" },
                __typename: "Ref",
              },
              __typename: "Repository",
            },
          },
        },
      },
    ]
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useFileContent({
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
      content: "test_content",
      sha: "test_oid",
    })
  })
})
