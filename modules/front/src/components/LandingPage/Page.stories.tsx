import React from "react"
import { action } from "@storybook/addon-actions"
import { Page } from "./Page"

export default { title: "LandingPage" }

export const Main = () => <Page goToLogin={action("click_login")} />
