import React from "react"
import { renderHook, RenderHookOptions } from "@testing-library/react-hooks"
import { MockedProvider, MockedResponse } from "@apollo/react-testing"
import { gql } from "apollo-boost"
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-boost"
import introspectionQueryResultData from "../../../schema/fragmentTypes.json"
import { useExplorerData } from "./hooks"

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
  query: gql`
    query getRepoEntities(
      $owner: String!
      $name: String!
      $expression: String!
    ) {
      repository(owner: $owner, name: $name) {
        object(expression: $expression) {
          ... on Tree {
            entries {
              name
              type
            }
          }
          ... on Blob {
            text
          }
        }
      }
    }
  `,
  variables: {
    owner: "test_owner",
    name: "test_name",
    expression: "test_expression",
  },
}

describe("useExplorerData", () => {
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
        useExplorerData({
          owner: "test_owner",
          name: "test_name",
          expression: "test_expression",
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
      text: "",
    })
  })

  test("get blob", async () => {
    const mocks = [
      {
        request,
        result: {
          data: {
            repository: {
              object: { text: "test_contents", __typename: "Blob" },
              __typename: "Repository",
            },
          },
        },
      },
    ]
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useExplorerData({
          owner: "test_owner",
          name: "test_name",
          expression: "test_expression",
        }),
      renderHookOptions(mocks),
    )
    expect(result.current).toEqual({ loading: true })
    await waitForNextUpdate()
    expect(result.current).toEqual({
      loading: false,
      entities: [],
      text: "test_contents",
    })
  })
})
