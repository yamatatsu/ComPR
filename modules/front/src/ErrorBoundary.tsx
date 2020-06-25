import React from "react"

type Props = {
  children: React.ReactElement
}
type State = {
  hasError: boolean
}
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(_: any, errorInfo: any) {
    // TODO: use error tracing service
    console.error(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3>エラーが発生しました。再描画をお試しください。</h3>
          <button onClick={() => location.reload()}>再描画する</button>
        </div>
      )
    }

    return this.props.children
  }
}
