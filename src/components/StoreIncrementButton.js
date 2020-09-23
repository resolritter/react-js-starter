import React from "react"
import IncrementButton from "./IncrementButton.js"
import { useDispatch, useSelector } from "react-redux"
import { get } from "lodash/fp"
import { increment } from "src/store/counter"

export const StoreIncrementButton = function() {
  const count = useSelector(get("counter"))
  const dispatch = useDispatch()
  return (
    <IncrementButton
      increment={function() {
        dispatch(increment())
      }}
      count={count}
      title={"Increment counter (Redux state)"}
    />
  )
}

export default StoreIncrementButton
