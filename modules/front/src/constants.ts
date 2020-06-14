const redirect_uri = process.env.redirect_uri
const client_id = process.env.client_id
const api_origin = process.env.api_origin

export const getConstants = () => {
  if (!redirect_uri) throw new Error("No redirect_uri is set in .env")
  if (!client_id) throw new Error("No client_id is set in .env")
  if (!api_origin) throw new Error("No api_origin is set in .env")

  return { client_id, api_origin, redirect_uri }
}
