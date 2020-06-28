import React, { FunctionComponent } from "react"
import { getConstants } from "../constants"
import { setToken as setTokenForApi } from "../lib/apiClient"

const { api_origin } = getConstants()

type Props = { setToken: (token: string) => void }
export const GithubCallback: FunctionComponent<Props> = (props) => {
  const { setToken } = props

  const urlSearchParams = new URLSearchParams(location.search)

  const returnedState = urlSearchParams.get("state")
  const state = sessionStorage.getItem("authorization_state")
  if (!returnedState || !state || returnedState !== state) {
    throw new Error("OAuth State is not match.")
  }

  const code = urlSearchParams.get("code")

  // 行儀の悪いコードを書いてしまった
  fetch(`${api_origin}/auth/token`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, state }),
  })
    .then((result) => result.json())
    .then((json) => {
      setToken(json.access_token)
      setTokenForApi(json.access_token)
    })

  return <div>Auth Loading...</div>
}
