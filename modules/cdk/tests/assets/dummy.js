/**
 * aws-s3-deployment や @aws-cdk/aws-lambda がデプロイしようとするソースコードのダミー。
 * アプリケーションコードの更新によってsnapshotテストがfailすようなことのなきように、snapshotテストではこれらのファイル用いる。
 *
 * cdkでアプリケーションコードをデプロイする仕組みでは、デプロイ対象コードのhash値がsnapshotとして登録される。
 * そのためアプリケーションコードを更新するとhash値が変わりsnapshotテストがfailする。
 */
