export const getPaths = (pathname: string) => {
  const path = pathname.replace(/\/$/, "")
  const currentPath = path.replace(/(\/[^/]*){3}\/list\/?/, "")
  const parentPath = currentPath.replace(/\/?[^/]*$/, "")

  return { currentPath, parentPath }
}
