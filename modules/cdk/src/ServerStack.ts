import * as cdk from "@aws-cdk/core"
import * as lambda from "@aws-cdk/aws-lambda"
import * as apigateway from "@aws-cdk/aws-apigatewayv2"

type Props = cdk.StackProps & {
  client_id: string
  client_secret: string
  redirect_uri: string
  code: lambda.Code
  layerCode: lambda.Code
  allowOrigins: string
}

export class ServerStack extends cdk.Stack {
  constructor(parent: cdk.Construct, id: string, props: Props) {
    super(parent, id, props)

    const {
      client_id,
      client_secret,
      redirect_uri,
      code,
      layerCode,
      allowOrigins,
    } = props

    const nodeModulesLayer = new lambda.LayerVersion(this, "NodeModulesLayer", {
      code: layerCode,
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X],
    })
    const authTokenHandler = new lambda.Function(this, "authTokenHandler", {
      code,
      layers: [nodeModulesLayer],
      handler: "authToken.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: { client_id, client_secret, redirect_uri },
      tracing: lambda.Tracing.ACTIVE,
    })

    const httpApi = new apigateway.HttpApi(this, "httpApi", {
      apiName: `compr-httpApi-${id}`,
      corsPreflight: {
        allowCredentials: false,
        allowHeaders: ["content-type"],
        allowMethods: [apigateway.HttpMethod.GET, apigateway.HttpMethod.POST],
        allowOrigins: [allowOrigins],
      },
    })

    httpApi.addRoutes({
      path: "/auth/token",
      methods: [apigateway.HttpMethod.POST],
      integration: new apigateway.LambdaProxyIntegration({
        handler: authTokenHandler,
      }),
    })

    new cdk.CfnOutput(this, "api-url", {
      value: httpApi.url ?? "no url",
    })
  }
}
