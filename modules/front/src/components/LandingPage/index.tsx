import React from "react"
import { useHistory } from "react-router"
import { Page } from "./Page"

export const LandingPage = () => {
  const history = useHistory()
  const goToLogin = () => {
    history.push("/login")
  }
  return <Page goToLogin={goToLogin} />
}
