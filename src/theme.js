import { CSSProperties, useState, useEffect } from "react"
import { setCssVariable, getRootElement } from "src/utils"
import { unionDictionaryOf } from "./utils"
import { zipObject } from "lodash-es"

export const themes = {
  light: {
    name: "light",
    theme: {
      backgroundColor: "white",
      color: "black",
    },
  },
  dark: {
    name: "dark",
    theme: {
      backgroundColor: "black",
      color: "white",
    },
  },
}
export const themeList = Object.keys(themes)
export const themeEntries = zipObject(themeList, themeList)
export const initialTheme = "light"

let activeTheme
export function getActiveTheme() {
  return activeTheme
}

const themeChangedListeners = new Map()
export function useTheme(varName) {
  const id = useId()[0]
  const [theme] = useState(themes[getActiveTheme()].theme)
  useEffect(function () {
    themeChangedListeners.set(id, function subscription() {
      setValue(themes[getActiveTheme()].theme[varName])
    })

    return function unsubscribe() {
      themeChangedListeners.delete(id)
    }
  }, [])
  return value
}

export function setTheme(name) {
  activeTheme = name
  const theme = themes[activeTheme].theme
  Object.keys(theme).forEach(function (key) {
    setCssVariable(key, theme[key])
  })

  activeTheme = name
  themeChangedListeners.forEach(function (notify) {
    notify(activeTheme)
  })
}
