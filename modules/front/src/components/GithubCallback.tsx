import React, { FunctionComponent } from "react"
import { getConstants } from "../constants"

const { api_origin } = getConstants()

type Props = { setToken: (token: string) => void }
export const GithubCallback: FunctionComponent<Props> = (props) => {
  const { setToken } = props

  const urlSearchParams = new URLSearchParams(location.search)
  const code = urlSearchParams.get("code")

  // 行儀の悪いコードを書いてしまった
  fetch(`${api_origin}/auth/token`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  })
    .then((result) => result.json())
    .then((json) => {
      setToken(json.access_token)
    })

  return <div>Auth Loading...</div>
}
