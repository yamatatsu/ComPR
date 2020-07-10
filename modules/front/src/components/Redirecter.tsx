import React, { FunctionComponent, useEffect } from "react"
import { useHistory } from "react-router"
import { getPlainState } from "../lib/oauthState"

export const Redirecter: FunctionComponent = () => {
  const history = useHistory()

  useEffect(() => {
    const { redirectTo } = getPlainState()
    history.push(redirectTo)
  }, [])

  return <div>Redirecting...</div>
}
