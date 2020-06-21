export const getPaths = (pathname: string) => {
  const currentPath = pathname.replace(/\/$/, "")
  const repositoryPath = currentPath.replace(
    new RegExp(`/[^/]*/[^/]*/[^/]*/?`),
    "",
  )
  const parentPath = currentPath.replace(/\/[^/]*$/, "")

  return { currentPath, parentPath, repositoryPath }
}

export const getExpression = ({
  branch,
  repositoryPath,
}: {
  branch: string
  repositoryPath: string
}) => `${branch}:${decodeURI(repositoryPath)}`
