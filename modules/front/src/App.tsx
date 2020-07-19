import React, { ReactElement, useState } from "react"
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useParams,
} from "react-router-dom"
import ApolloClient, {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"
import { ErrorBoundary } from "./ErrorBoundary"
import { Theme } from "./Theme"

import introspectionQueryResultData from "../schema/fragmentTypes.json"
import { LandingPage } from "./components/LandingPage"
import { GithubLogin, GithubLoginAndRedirect } from "./components/GithubLogin"
import { GithubCallback } from "./components/GithubCallback"
import { Redirecter } from "./components/Redirecter"
import { RepoList } from "./components/RepoList"
import { Explorer } from "./components/Explorer"
import { NewEditor, EditEditor } from "./components/Editor"
import { NotFound } from "./components/NotFound"

export function App(): ReactElement {
  const [token, setToken] = useState<string | null>(
    process.env.token_for_debug ?? null,
  )

  if (!token) {
    return (
      <ErrorBoundary>
        <Theme>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={GithubLogin} />
              <Route exact path="/login/callback">
                <GithubCallback setToken={setToken} />
              </Route>
              <Route path="*" component={GithubLoginAndRedirect} />
            </Switch>
          </BrowserRouter>
        </Theme>
      </ErrorBoundary>
    )
  }

  const client = new ApolloClient({
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData,
      }),
    }),
    uri: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Theme>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={RepoList} />
              <Route exact path="/login/callback" component={Redirecter} />
              <Route
                path="/:owner/:repo/:branch/new"
                component={() => {
                  const { owner, repo, branch } = useParams()
                  return <NewEditor owner={owner} repo={repo} branch={branch} />
                }}
              />
              <Route
                path="/:owner/:repo/:branch/edit"
                component={() => {
                  const { owner, repo, branch } = useParams()
                  return (
                    <EditEditor owner={owner} repo={repo} branch={branch} />
                  )
                }}
              />
              <Route
                path="/:owner/:repo/:branch/list"
                component={() => {
                  const { owner, repo, branch } = useParams()
                  return <Explorer owner={owner} repo={repo} branch={branch} />
                }}
              />
              <Route exact path="/not-found" component={NotFound} />
              <Redirect from="*" to="/not-found" />
            </Switch>
          </BrowserRouter>
        </Theme>
      </ApolloProvider>
    </ErrorBoundary>
  )
}
