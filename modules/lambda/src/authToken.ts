/**
 * Exchange code to token
 */
import { APIGatewayProxyHandlerV2 as Handler } from "aws-lambda"
import fetch from "node-fetch"

const ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"

export const handler: Handler = async (event) => {
  const { client_id, client_secret, redirect_uri } = process.env
  if (!client_id) throw new Error("no client_id in `process.env`")
  if (!client_secret) throw new Error("no client_secret in `process.env`")
  if (!redirect_uri) throw new Error("no redirect_uri in `process.env`")

  const code: string | undefined = event.body && JSON.parse(event.body).code
  if (!code) {
    console.warn("`event.queryStringParameters` has no code")
    return { statusCode: 400 }
  }

  const res = await fetch(ACCESS_TOKEN_URL, {
    method: "post",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id,
      client_secret,
      redirect_uri,
      code,
      // state: "", // TODO: impl me
    }),
  })

  if (!res.ok) {
    console.error(`"${ACCESS_TOKEN_URL}" response error. %o`, res)
    return { statusCode: 500 }
  }
  const json = await res.json()

  if (json.error) {
    console.error(`"${ACCESS_TOKEN_URL}" response error. %o`, json)
    return { statusCode: 500 }
  }

  return json
}
