import React from "react"
import { Link } from "react-router-dom"
import { Template } from "./templates"

export const LandingPage = () => (
  <Template>
    <h1>LP</h1>
    <Link to="/login">
      <button>Login</button>
    </Link>
  </Template>
)
