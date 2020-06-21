import { SynthUtils } from "@aws-cdk/assert"
import { Stack } from "@aws-cdk/core"
import { CloudFrontStack } from "../src/CloudFrontStack"

test("CloudFrontStack snapshot test", () => {
  const stack = new Stack()
  const env = { region: "ap-northeast-1", account: "xxxxxs" }

  const target = new CloudFrontStack(stack, "testCloudFrontStack", {
    env,
  })

  expect(SynthUtils.toCloudFormation(target)).toMatchSnapshot()
})
