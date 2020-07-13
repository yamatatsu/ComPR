export const getPaths = (pathname: string) => {
  const path = pathname.replace(/\/$/, "")
  const currentPath = path.replace(/(\/[^/]*){3}\/(new|edit)\/?/, "")

  return { currentPath }
}
