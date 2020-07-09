import { v4 as uuid } from "uuid"

type PlainState = { redirectTo: string }

export const createState = (plain: PlainState): string => {
  const state = encodeURIComponent(JSON.stringify({ ...plain, id: uuid() }))
  sessionStorage.setItem("authorization_state", state)
  return state
}

export const verifyState = (): void => {
  const state = new URLSearchParams(location.search).get("state")
  const rehydratedState = getState()
  if (!state || state !== rehydratedState) {
    throw new Error("OAuth State is not match.")
  }
}
export const getState = (): string => {
  const rehydratedState = sessionStorage.getItem("authorization_state")
  if (!rehydratedState) {
    throw new Error("No State is found in sessionStrage.")
  }
  return rehydratedState
}

export const getPlainState = (): PlainState => {
  const rehydratedState = getState()
  const plain = JSON.parse(decodeURIComponent(rehydratedState))
  return plain
}
