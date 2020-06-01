import { zipObject } from "lodash"

const cssVariablePrefix = "--"
export function newCssVariableName(name) {
  return `${cssVariablePrefix}${name}`
}

export function cssVariableValueOf(name) {
  return `var(${newCssVariableName(name)})`
}

export function unionDictionaryOf(array) {
  return zipObject(array, array)
}

export function setCssVariable(name, value) {
  document.documentElement.style.setProperty(newCssVariableName(name), value)
}
