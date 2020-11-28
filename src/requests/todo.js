import { genAPIRequester } from "./utils"

import { todoEndpoints } from "src/apiEndpoints"
import slice from "src/store/todo"
const { actions } = slice

export const loadTodo = genAPIRequester({
  endpoint: todoEndpoints.get,
  fetchOptions: {
    method: "GET",
  },
  reduxAction: actions.setTodo,
  mapResponse: async function (res) {
    return await res.json()
  },
})
