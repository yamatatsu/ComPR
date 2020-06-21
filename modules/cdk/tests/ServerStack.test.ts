import { SynthUtils } from "@aws-cdk/assert"
import { Stack } from "@aws-cdk/core"
import { AssetCode } from "@aws-cdk/aws-lambda"
import { ServerStack } from "../src/ServerStack"

test("ServerStack snapshot test", () => {
  const stack = new Stack()
  const env = { region: "ap-northeast-1", account: "xxxxxs" }

  const target = new ServerStack(stack, "testServerStack", {
    client_id: "test_client_id",
    client_secret: "test_client_secret",
    redirect_uri: "test_redirect_uri",
    code: new AssetCode(`${__dirname}/assets`),
    layerCode: new AssetCode(`${__dirname}/assets`),
    allowOrigins: "https://d2gteuwc4ok948.cloudfront.net",
    env,
  })

  expect(SynthUtils.toCloudFormation(target)).toMatchSnapshot()
})
