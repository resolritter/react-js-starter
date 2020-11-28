import React from "react"

export const IncrementButton = function ({
  increment,
  count,
  title = "Increment counter",
}) {
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>{title}</button>
    </div>
  )
}

export default IncrementButton
