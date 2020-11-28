import React from "react"

export const IncrementButton = function ({
  increment,
  count,
  title = "Increment counter",
}) {
  return (
    <div>
      <button onClick={increment}>{title}</button>
      <p>Count: {count}</p>
    </div>
  )
}

export default IncrementButton
