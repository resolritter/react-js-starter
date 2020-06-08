import React from "react"
import { themedButton } from "./style"

export function IncrementButton({ increment, count, title = "Increment counter" }) {
  return (
    <div>
      <span>{count}</span>
      <button
        className={themedButton}
        onClick={increment}
      >
        {title}
      </button>
    </div>
  )
}

export default IncrementButton
