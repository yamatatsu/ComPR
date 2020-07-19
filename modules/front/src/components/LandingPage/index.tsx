import React, { ReactElement } from "react"
import { useHistory } from "react-router"
import { Page } from "./Page"

export function LandingPage(): ReactElement {
  const history = useHistory()
  const goToLogin = () => {
    history.push("/login")
  }
  return <Page goToLogin={goToLogin} />
}
