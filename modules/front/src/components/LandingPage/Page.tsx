import React from "react"

type Props = {
  goToLogin: () => void
}

export const Page = (props: Props) => {
  const { goToLogin } = props
  return (
    <>
      <h1>LP</h1>
      <button onClick={goToLogin}>Login</button>
    </>
  )
}
