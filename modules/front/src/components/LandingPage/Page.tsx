import React from "react"
import { Template } from "../templates"

type Props = {
  goToLogin: () => void
}

export const Page = (props: Props) => {
  const { goToLogin } = props
  return (
    <Template>
      <h1>LP</h1>
      <button onClick={goToLogin}>Login</button>
    </Template>
  )
}
