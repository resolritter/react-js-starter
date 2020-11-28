import { createSlice } from "@reduxjs/toolkit"

export const initialState = {}

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: function (state, { payload }) {
      state.todo = payload
      state.updateTime = Date.now()
    },
  },
})

export default slice
