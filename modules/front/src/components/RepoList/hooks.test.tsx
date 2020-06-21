import React from "react"
import { renderHook } from "@testing-library/react-hooks"
import { MockedProvider } from "@apollo/react-testing"
import { gql } from "apollo-boost"
import { useRepositories } from "./hooks"

const query = gql`
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
`

describe("useRepositories", () => {
  const mocks = [
    {
      request: { query },
      result: {
        data: {
          viewer: {
            login: "yamatatsu",
            repositories: {
              nodes: [
                { name: "repo1" },
                { name: "repo2" },
                { name: "repo3" },
                { name: "repo4" },
                { name: "repo5" },
                { name: "repo6" },
                { name: "repo7" },
                { name: "repo8" },
                { name: "repo9" },
                { name: "repo10" },
                { name: "repo11" },
                { name: "repo12" },
                { name: "repo13" },
                { name: "repo14" },
                { name: "repo15" },
                { name: "repo16" },
                { name: "repo17" },
                { name: "repo18" },
                { name: "repo19" },
                { name: "repo20" },
              ],
            },
            organizations: {
              nodes: [
                {
                  login: "Org1",
                  repositories: {
                    nodes: [
                      { name: "Org1Repo1" },
                      { name: "Org1Repo2" },
                      { name: "Org1Repo3" },
                      { name: "Org1Repo4" },
                      { name: "Org1Repo5" },
                      { name: "Org1Repo6" },
                      { name: "Org1Repo7" },
                      { name: "Org1Repo8" },
                      { name: "Org1Repo9" },
                      { name: "Org1Repo10" },
                      { name: "Org1Repo11" },
                      { name: "Org1Repo12" },
                      { name: "Org1Repo13" },
                      { name: "Org1Repo14" },
                      { name: "Org1Repo15" },
                      { name: "Org1Repo16" },
                      { name: "Org1Repo17" },
                      { name: "Org1Repo18" },
                      { name: "Org1Repo19" },
                      { name: "Org1Repo20" },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
  ]
  test("get repositories", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRepositories(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          <>{children}</>
        </MockedProvider>
      ),
    })
    expect(result.current).toEqual({ type: "Loading", loading: true })
    await waitForNextUpdate()
    expect(result.current).toEqual({
      type: "Loaded",
      repos: [
        { owner: "yamatatsu", name: "repo1" },
        { owner: "yamatatsu", name: "repo2" },
        { owner: "yamatatsu", name: "repo3" },
        { owner: "yamatatsu", name: "repo4" },
        { owner: "yamatatsu", name: "repo5" },
        { owner: "yamatatsu", name: "repo6" },
        { owner: "yamatatsu", name: "repo7" },
        { owner: "yamatatsu", name: "repo8" },
        { owner: "yamatatsu", name: "repo9" },
        { owner: "yamatatsu", name: "repo10" },
        { owner: "yamatatsu", name: "repo11" },
        { owner: "yamatatsu", name: "repo12" },
        { owner: "yamatatsu", name: "repo13" },
        { owner: "yamatatsu", name: "repo14" },
        { owner: "yamatatsu", name: "repo15" },
        { owner: "yamatatsu", name: "repo16" },
        { owner: "yamatatsu", name: "repo17" },
        { owner: "yamatatsu", name: "repo18" },
        { owner: "yamatatsu", name: "repo19" },
        { owner: "yamatatsu", name: "repo20" },
        { owner: "Org1", name: "Org1Repo1" },
        { owner: "Org1", name: "Org1Repo2" },
        { owner: "Org1", name: "Org1Repo3" },
        { owner: "Org1", name: "Org1Repo4" },
        { owner: "Org1", name: "Org1Repo5" },
        { owner: "Org1", name: "Org1Repo6" },
        { owner: "Org1", name: "Org1Repo7" },
        { owner: "Org1", name: "Org1Repo8" },
        { owner: "Org1", name: "Org1Repo9" },
        { owner: "Org1", name: "Org1Repo10" },
        { owner: "Org1", name: "Org1Repo11" },
        { owner: "Org1", name: "Org1Repo12" },
        { owner: "Org1", name: "Org1Repo13" },
        { owner: "Org1", name: "Org1Repo14" },
        { owner: "Org1", name: "Org1Repo15" },
        { owner: "Org1", name: "Org1Repo16" },
        { owner: "Org1", name: "Org1Repo17" },
        { owner: "Org1", name: "Org1Repo18" },
        { owner: "Org1", name: "Org1Repo19" },
        { owner: "Org1", name: "Org1Repo20" },
      ],
    })
  })
})
