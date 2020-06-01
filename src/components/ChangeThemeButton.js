import React from "react"
import { getActiveTheme, useTheme, themes, themeEntries, setTheme } from "src/theme"
import { themedButton } from "./style"

export function Button() {
  return (
    <button
      className={themedButton}
      onClick={function () {
        const activeTheme = getActiveTheme()
        if (activeTheme == "light") {
          setTheme(themeEntries.dark)
        } else {
          setTheme(themeEntries.light)
        }
      }}
    >
      Change the theme
    </button>
  )
}

export default Button
