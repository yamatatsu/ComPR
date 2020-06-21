/**
 * Exchange code to token
 */
import { APIGatewayProxyHandlerV2 as Handler } from "aws-lambda"
import { fetch } from "./lib/fetch"
import { authToken } from "./implements/authToken"

const { client_id, client_secret, redirect_uri } = process.env

export const handler: Handler = async (event) =>
  authToken(event, { client_id, client_secret, redirect_uri }, fetch)
