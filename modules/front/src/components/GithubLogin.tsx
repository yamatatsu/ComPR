import React, { ReactElement } from "react"
import { getConstants } from "../constants"
import { createState } from "../lib/oauthState"

const { redirect_uri, client_id } = getConstants()

export function GithubLogin(): ReactElement {
  const state = createState({ redirectTo: "/" })

  const params = new URLSearchParams({
    scope: "repo,read:org",
    client_id,
    redirect_uri,
    state: state,
  })
  location.assign(
    `https://github.com/login/oauth/authorize?${params.toString()}`,
  )

  return <div>Redirect to Github...</div>
}

export function GithubLoginAndRedirect(): ReactElement {
  const state = createState({ redirectTo: location.pathname })

  const params = new URLSearchParams({
    scope: "repo,read:org",
    client_id,
    redirect_uri,
    state: state,
  })
  location.assign(
    `https://github.com/login/oauth/authorize?${params.toString()}`,
  )

  return <div>Redirect to Github...</div>
}
