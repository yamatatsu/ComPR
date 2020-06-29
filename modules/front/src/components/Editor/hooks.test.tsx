import React from "react"
import { renderHook, RenderHookOptions } from "@testing-library/react-hooks"
import { MockedProvider, MockedResponse } from "@apollo/react-testing"
import { gql } from "apollo-boost"
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-boost"
import introspectionQueryResultData from "../../../schema/fragmentTypes.json"
import { useFileContent } from "./hooks"

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

describe("useFileContent", () => {
  test("get blob", async () => {
    const mocks = [
      {
        request,
        result: {
          data: {
            repository: {
              object: { text: "test_content", __typename: "Blob" },
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
          name: "test_name",
          expression: "test_expression",
        }),
      renderHookOptions(mocks),
    )
    expect(result.current).toEqual({ loading: true })
    await waitForNextUpdate()
    expect(result.current).toEqual({
      loading: false,
      content: "test_content",
    })
  })
})
