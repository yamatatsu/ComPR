import React from "react"
import { v4 as uuid } from "uuid"
import { getConstants } from "../constants"

const { redirect_uri, client_id } = getConstants()

export const GithubLogin = () => {
  const state = uuid()
  sessionStorage.setItem("authorization_state", state)

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
