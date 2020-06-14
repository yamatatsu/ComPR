import React from "react"
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import { getConstants } from "./constants"

const { redirect_uri, client_id, api_origin } = getConstants()

export function App() {
  // const MonacoEditor = React.lazy(() => import("./MonacoEditor"))

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <div>Repo List</div>} />
        <Route
          exact
          path="/login"
          component={() => {
            const params = new URLSearchParams({
              // scope: "user:email,read:org,repo:status,write:repo_hook,repo",
              scope: "",
              client_id,
              redirect_uri,
              // state: stateString,
            })
            location.assign(
              `https://github.com/login/oauth/authorize?${params.toString()}`,
            )
            return <div>Redirect to Github...</div>
          }}
        />
        <Route
          exact
          path="/login/callback"
          component={() => {
            const urlSearchParams = new URLSearchParams(location.search)
            const code = urlSearchParams.get("code")
            fetch(`${api_origin}/auth/token`, {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code }),
            })
              .then((result) => result.json())
              .then((json) => console.log("json: %o", json))
            return <div>Auth Loading...</div>
          }}
        />
        <Route
          path="/:owener/:repo/:branch"
          component={() => <div>Explorer</div>}
        />
        <Route exact path="/not-found" component={() => <div>Not Found</div>} />
        <Redirect from="*" to="/not-found" />
      </Switch>
    </BrowserRouter>
  )
}
