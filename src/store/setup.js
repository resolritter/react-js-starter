import { configureStore } from "@reduxjs/toolkit"
import { createBrowserHistory } from "history"

import counter from "./counter"
import todo from "./todo"

export default function (preloadedState) {
  const history = createBrowserHistory()
  const middlewares = []
  const enhancers = []

  const store = configureStore({
    reducer: {
      counter: counter.reducer,
      todo: todo.reducer,
    },
    middlewares,
    preloadedState,
    enhancers,
  })

  return { store, history }
}
