import React, { FunctionComponent, useEffect } from "react"
import { getConstants } from "../constants"
import { setToken as setTokenForApi } from "../lib/apiClient"
import { verifyState, getState } from "../lib/oauthState"

const { api_origin } = getConstants()

type Props = { setToken: (token: string) => void }
export const GithubCallback: FunctionComponent<Props> = (props) => {
  const { setToken } = props

  verifyState()
  const state = getState()

  const code = new URLSearchParams(location.search).get("code")

  useEffect(() => {
    fetch(`${api_origin}/auth/token`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, state }),
    })
      .then((result) => result.json())
      .then((json) => {
        setTokenForApi(json.access_token)
        setToken(json.access_token)
      })
  }, [])

  return <div>Auth Loading...</div>
}
