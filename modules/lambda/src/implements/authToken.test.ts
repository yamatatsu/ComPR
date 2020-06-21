import { authToken } from "./authToken"

describe("authToken", () => {
  test("success", async () => {
    const event = {
      body: JSON.stringify({ code: "test_code", state: "test_state" }),
    }
    const env = {
      client_id: "test_client_id",
      client_secret: "test_client_secret",
      redirect_uri: "test_redirect_uri",
    }
    const fetch = async () =>
      ({ type: "ok", json: { test: "success" } } as const)
    await expect(authToken(event, env, fetch)).resolves.toEqual({
      test: "success",
    })
  })

  test("error if no client_id", async () => {
    const event = {
      body: JSON.stringify({ code: "test_code", state: "test_state" }),
    }
    const env = {
      client_id: undefined,
      client_secret: "test_client_secret",
      redirect_uri: "test_redirect_uri",
    }
    const fetch = async () =>
      ({ type: "ok", json: { test: "success" } } as const)
    await expect(authToken(event, env, fetch)).rejects.toThrowError(
      "no client_id in `process.env`",
    )
  })
  test("error if no client_secret", async () => {
    const event = {
      body: JSON.stringify({ code: "test_code", state: "test_state" }),
    }
    const env = {
      client_id: "test_client_id",
      client_secret: undefined,
      redirect_uri: "test_redirect_uri",
    }
    const fetch = async () =>
      ({ type: "ok", json: { test: "success" } } as const)
    await expect(authToken(event, env, fetch)).rejects.toThrowError(
      "no client_secret in `process.env`",
    )
  })
  test("error if no redirect_uri", async () => {
    const event = {
      body: JSON.stringify({ code: "test_code", state: "test_state" }),
    }
    const env = {
      client_id: "test_client_id",
      client_secret: "test_client_secret",
      redirect_uri: undefined,
    }
    const fetch = async () =>
      ({ type: "ok", json: { test: "success" } } as const)
    await expect(authToken(event, env, fetch)).rejects.toThrowError(
      "no redirect_uri in `process.env`",
    )
  })

  test("error if code is not string", async () => {
    const event = {
      body: JSON.stringify({ code: 1, state: "test_state" }),
    }
    const env = {
      client_id: "test_client_id",
      client_secret: "test_client_secret",
      redirect_uri: "test_redirect_uri",
    }
    const fetch = async () =>
      ({ type: "ok", json: { test: "success" } } as const)
    await expect(authToken(event, env, fetch)).resolves.toEqual({
      statusCode: 400,
    })
  })
  test("error if state is not string", async () => {
    const event = {
      body: JSON.stringify({ code: "test_code", state: 1 }),
    }
    const env = {
      client_id: "test_client_id",
      client_secret: "test_client_secret",
      redirect_uri: "test_redirect_uri",
    }
    const fetch = async () =>
      ({ type: "ok", json: { test: "success" } } as const)
    await expect(authToken(event, env, fetch)).resolves.toEqual({
      statusCode: 400,
    })
  })

  test("error if fetch return error", async () => {
    const event = {
      body: JSON.stringify({ code: "test_code", state: "test_state" }),
    }
    const env = {
      client_id: "test_client_id",
      client_secret: "test_client_secret",
      redirect_uri: "test_redirect_uri",
    }
    const fetch = async () =>
      ({ type: "error", message: "test_message" } as const)
    await expect(authToken(event, env, fetch)).resolves.toEqual({
      statusCode: 500,
    })
  })
})
