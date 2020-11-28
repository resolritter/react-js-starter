import { configureStore } from "@reduxjs/toolkit"
import { routerMiddleware } from "connected-react-router"
import { connectRouter } from "connected-react-router"
import { createBrowserHistory } from "history"

import counter from "./counter"
import todo from "./todo"

export default function (preloadedState) {
  const history = createBrowserHistory()
  const middleware = [routerMiddleware(history)]
  const enhancers = []

  const store = configureStore({
    reducer: {
      counter: counter.reducer,
      todo: todo.reducer,
      router: connectRouter(history),
    },
    middleware,
    preloadedState,
    enhancers,
  })

  return { store, history }
}
