import React, { useState } from "react"
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "@apollo/react-hooks"

import { LandingPage } from "./components/LandingPage"
import { GithubLogin } from "./components/GithubLogin"
import { GithubCallback } from "./components/GithubCallback"
import { RepoList } from "./components/RepoList"
import { Explorer } from "./components/Explorer"
import { NotFound } from "./components/NotFound"

export function App() {
  // const MonacoEditor = React.lazy(() => import("./MonacoEditor"))

  const [token, setToken] = useState<string | null>(
    process.env.token_for_debug ?? null,
  )

  if (!token) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={GithubLogin} />
          <Route exact path="/login/callback">
            <GithubCallback setToken={setToken} />
          </Route>
          <Route exact path="/not-found" component={NotFound} />
          <Redirect from="*" to="/not-found" />
        </Switch>
      </BrowserRouter>
    )
  }

  console.log(token)

  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RepoList} />
          <Redirect from="/login/callback" to="/" />
          <Route
            path="/:owner/:repo/:branch"
            component={() => {
              const { owner, repo, branch } = useParams()
              return <Explorer owner={owner} repo={repo} branch={branch} />
            }}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect from="*" to="/not-found" />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}
