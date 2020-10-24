import React from "react"
import { get } from "lodash/fp"
import { useDispatch, useSelector } from "react-redux"

import IncrementButton from "./IncrementButton"

import { increment } from "src/store/counter"

export const StoreIncrementButton = function () {
  const count = useSelector(get("counter"))
  const dispatch = useDispatch()
  return (
    <IncrementButton
      increment={function () {
        dispatch(increment())
      }}
      count={count}
      title={"Increment counter (Redux state)"}
    />
  )
}

export default StoreIncrementButton
