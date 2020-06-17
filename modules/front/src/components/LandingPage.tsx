import React from "react"
import { Link } from "react-router-dom"

export const LandingPage = () => (
  <div>
    <h1>LP</h1>
    <Link to="/login">
      <button>Login</button>
    </Link>
  </div>
)
