import React, { ReactElement, useEffect } from "react"
import { useHistory } from "react-router"
import { getPlainState } from "../lib/oauthState"

export function Redirecter(): ReactElement {
  const history = useHistory()

  useEffect(() => {
    const { redirectTo } = getPlainState()
    history.push(redirectTo)
  }, [])

  return <div>Redirecting...</div>
}
