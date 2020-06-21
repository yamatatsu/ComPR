import { getPaths } from "./selectors"

describe("getPaths", () => {
  test("get currentPath", () => {
    const result = getPaths("/owner1/repo1/branch1/this/is/path")
    expect(result.currentPath).toBe("/owner1/repo1/branch1/this/is/path")
  })
  test("get currentPath with removing last `/`", () => {
    const result = getPaths("/owner1/repo1/branch1/this/is/path/")
    expect(result.currentPath).toBe("/owner1/repo1/branch1/this/is/path")
  })

  test("get parentPath", () => {
    const result = getPaths("/owner1/repo1/branch1/this/is/path")
    expect(result.parentPath).toBe("/owner1/repo1/branch1/this/is")
  })
  test("get parentPath with removing last `/`", () => {
    const result = getPaths("/owner1/repo1/branch1/this/is/path/")
    expect(result.parentPath).toBe("/owner1/repo1/branch1/this/is")
  })
  test("get parentPath if repository root", () => {
    const result = getPaths("/owner1/repo1/branch1")
    expect(result.parentPath).toBe("/owner1/repo1")
  })
  test("get parentPath with removing last `/` if repository root", () => {
    const result = getPaths("/owner1/repo1/branch1/")
    expect(result.parentPath).toBe("/owner1/repo1")
  })

  test("get repositoryPath", () => {
    const result = getPaths("/owner1/repo1/branch1/this/is/path")
    expect(result.repositoryPath).toBe("this/is/path")
  })
  test("get repositoryPath with removing last `/`", () => {
    const result = getPaths("/owner1/repo1/branch1/this/is/path/")
    expect(result.repositoryPath).toBe("this/is/path")
  })
  test("get repositoryPath if repository root", () => {
    const result = getPaths("/owner1/repo1/branch1/")
    expect(result.repositoryPath).toBe("")
  })
  test("get repositoryPath with removing last `/` if repository root", () => {
    const result = getPaths("/owner1/repo1/branch1")
    expect(result.repositoryPath).toBe("")
  })
})
