import { getPaths } from "./selectors"

describe("getPaths", () => {
  test("get repositoryPath", () => {
    const result = getPaths("/owner1/repo1/branch1/edit/this/is/path")
    expect(result.currentPath).toBe("this/is/path")
  })
  test("get currentPath with removing last `/`", () => {
    const result = getPaths("/owner1/repo1/branch1/edit/this/is/path/")
    expect(result.currentPath).toBe("this/is/path")
  })
})
