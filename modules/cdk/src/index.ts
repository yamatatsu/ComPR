import * as cdk from "@aws-cdk/core"
import * as lambda from "@aws-cdk/aws-lambda"
import { CloudFrontStack } from "./CloudFrontStack"
import { ServerStack } from "./ServerStack"

const {
  client_id,
  client_secret,
  redirect_uri,
  dev_client_id,
  dev_client_secret,
  dev_redirect_uri,
} = process.env
if (!client_id) throw new Error("no client_id in `process.env`")
if (!client_secret) throw new Error("no client_secret in `process.env`")
if (!redirect_uri) throw new Error("no redirect_uri in `process.env`")
if (!dev_client_id) throw new Error("no dev_client_id in `process.env`")
if (!dev_client_secret) throw new Error("no dev_client_secret in `process.env`")
if (!dev_redirect_uri) throw new Error("no dev_redirect_uri in `process.env`")

const env = { region: "ap-northeast-1" }

const app = new cdk.App()

const code = new lambda.AssetCode(`${__dirname}/../../lambda/dist`)
const layerCode = new lambda.AssetCode(`${__dirname}/../layer`)
new ServerStack(app, "ServerStack", {
  client_id,
  client_secret,
  redirect_uri,
  code,
  layerCode,
  allowOrigins: "https://d2gteuwc4ok948.cloudfront.net",
  env,
})

const devCode = new lambda.AssetCode(`${__dirname}/../../lambda/dist`)
const devLayerCode = new lambda.AssetCode(`${__dirname}/../layer`)
new ServerStack(app, "DevServerStack", {
  client_id: dev_client_id,
  client_secret: dev_client_secret,
  redirect_uri: dev_redirect_uri,
  code: devCode,
  layerCode: devLayerCode,
  allowOrigins: "http://localhost:8080",
  env,
})

new CloudFrontStack(app, "CloudFrontStack", { env })
