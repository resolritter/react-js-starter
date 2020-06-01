import React from "react"
import { themedButton } from "./style"
import { useDispatch, useSelector } from "react-redux"
import { get } from "lodash/fp"
import counterStore from "src/store/counter"

export function Button() {
  const counter = useSelector(get("counter"))
  const dispatch = useDispatch()
  return (
    <div>
      <span>{counter}</span>
      <button
        className={themedButton}
        onClick={function () {
          dispatch(counterStore.actions.increment())
        }}
      >
        Increment counter
      </button>
    </div>
  )
}

export default Button
