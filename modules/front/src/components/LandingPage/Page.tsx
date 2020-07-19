import React, { ReactElement } from "react"

type Props = {
  goToLogin: () => void
}

export function Page(props: Props): ReactElement {
  const { goToLogin } = props
  return (
    <>
      <h1>LP</h1>
      <button onClick={goToLogin}>Login</button>
    </>
  )
}
