import * as cdk from "@aws-cdk/core"
import * as cloudfront from "@aws-cdk/aws-cloudfront"
import * as s3 from "@aws-cdk/aws-s3"

type Props = cdk.StackProps & {}

export class CloudFrontStack extends cdk.Stack {
  constructor(parent: cdk.Construct, id: string, props: Props) {
    super(parent, id, props)

    const bucket = new s3.Bucket(this, `bucket`, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })
    const oai = new cloudfront.OriginAccessIdentity(this, `oai`)

    new cloudfront.CloudFrontWebDistribution(
      this,
      "CloudFrontWebDistribution",
      {
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        httpVersion: cloudfront.HttpVersion.HTTP2,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity: oai,
            },
            behaviors: [
              {
                pathPattern: "index.html",
                minTtl: cdk.Duration.seconds(0),
                maxTtl: cdk.Duration.seconds(0),
                defaultTtl: cdk.Duration.seconds(0),
              },
              {
                isDefaultBehavior: true,
                minTtl: cdk.Duration.seconds(0),
                maxTtl: cdk.Duration.days(365),
                defaultTtl: cdk.Duration.days(1),
              },
            ],
          },
        ],
        errorConfigurations: [
          {
            errorCachingMinTtl: 0,
            errorCode: 403,
            responseCode: 200,
            responsePagePath: "/index.html",
          },
          {
            errorCachingMinTtl: 0,
            errorCode: 404,
            responseCode: 200,
            responsePagePath: "/index.html",
          },
        ],
      },
    )

    new cdk.CfnOutput(this, "bucket-name", {
      value: bucket.bucketName,
    })
  }
}
