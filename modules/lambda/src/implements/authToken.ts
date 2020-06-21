/**
 * Exchange code to token
 */
import { APIGatewayProxyEventV2 } from "aws-lambda"
import { Fetch } from "../lib/fetch"

const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"

export const authToken = async (
  event: Pick<APIGatewayProxyEventV2, "body">,
  env: { client_id: any; client_secret: any; redirect_uri: any },
  fetch: Fetch,
) => {
  const { client_id, client_secret, redirect_uri } = env
  if (!client_id) throw new Error("no client_id in `process.env`")
  if (!client_secret) throw new Error("no client_secret in `process.env`")
  if (!redirect_uri) throw new Error("no redirect_uri in `process.env`")

  const { code, state } = event.body && JSON.parse(event.body)

  if (!isString(code)) {
    console.warn("`JSON.parse(event.body).code` should be string.")
    return { statusCode: 400 }
  }
  if (!isString(state)) {
    console.warn("`JSON.parse(event.body).state` should be string.")
    return { statusCode: 400 }
  }

  const res = await fetch(ACCESS_TOKEN_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      redirect_uri,
      code,
      state,
    }),
  })

  if (res.type === "error") {
    console.error(res.message)
    return { statusCode: 500 }
  }

  return res.json
}

function isString(str: any): str is string {
  return typeof str === "string"
}
