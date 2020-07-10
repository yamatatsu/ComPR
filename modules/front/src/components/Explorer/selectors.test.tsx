import { getPaths } from "./selectors"

describe("getPaths", () => {
  test("get currentPath", () => {
    const result = getPaths("/owner1/repo1/branch1/list/this/is/path")
    expect(result.currentPath).toBe("this/is/path")
  })
  test("get currentPath with removing last `/`", () => {
    const result = getPaths("/owner1/repo1/branch1/list/this/is/path/")
    expect(result.currentPath).toBe("this/is/path")
  })
  test("get currentPath if repository root", () => {
    const result = getPaths("/owner1/repo1/branch1/list/")
    expect(result.currentPath).toBe("")
  })
  test("get currentPath with removing last `/` if repository root", () => {
    const result = getPaths("/owner1/repo1/branch1/list")
    expect(result.currentPath).toBe("")
  })

  test("get parentPath", () => {
    const result = getPaths("/owner1/repo1/branch1/list/this/is/path")
    expect(result.parentPath).toBe("this/is")
  })
  test("get parentPath with removing last `/`", () => {
    const result = getPaths("/owner1/repo1/branch1/list/this/is/path/")
    expect(result.parentPath).toBe("this/is")
  })
  test("get parentPath if repository root", () => {
    const result = getPaths("/owner1/repo1/branch1/list")
    expect(result.parentPath).toBe("")
  })
  test("get parentPath with removing last `/` if repository root", () => {
    const result = getPaths("/owner1/repo1/branch1/list/")
    expect(result.parentPath).toBe("")
  })
})
