import { createAction, createSlice } from "@reduxjs/toolkit"

export const increment = createAction("increment")

export default createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    [increment]: function (state, { payload = 1 }) {
      return state + payload
    },
  },
})
