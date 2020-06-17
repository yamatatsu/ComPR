import React from "react"
import { getConstants } from "../constants"

const { redirect_uri, client_id } = getConstants()

export const GithubLogin = () => {
  const params = new URLSearchParams({
    scope: "repo,read:org",
    client_id,
    redirect_uri,
    // state: stateString,
  })
  location.assign(
    `https://github.com/login/oauth/authorize?${params.toString()}`,
  )
  return <div>Redirect to Github...</div>
}
