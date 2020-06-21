import { format } from "util"
import nodeFetch, { RequestInit } from "node-fetch"

export type Fetch = (
  url: string,
  option: RequestInit,
) => Promise<{ type: "ok"; json: any } | { type: "error"; message: string }>

export const fetch: Fetch = async (url, option) => {
  const res = await nodeFetch(url, option)

  if (!res.ok) {
    return {
      type: "error",
      message: format(`"${url}" response error. res: %o`, res),
    }
  }
  const json = await res.json()

  if (json.error) {
    return {
      type: "error",
      message: format(`"${url}" response error. json: %o`, json),
    }
  }

  return json
}
