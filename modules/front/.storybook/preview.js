import React from "react"
import { addDecorator } from "@storybook/react"
import { Theme } from "../src/Theme"

addDecorator((storyFn) => <Theme>{storyFn()}</Theme>)
