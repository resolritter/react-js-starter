import { createBrowserHistory } from "history"
import { applyMiddleware, compose, createStore } from "redux"
import { routerMiddleware } from "connected-react-router"
import counter from "./counter.js"
import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

const devToolsComposeExtension = "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"
export default function (preloadedState) {
  const history = createBrowserHistory()
  const middleware = [routerMiddleware(history)]
  const enhancers = []

  const store = configureStore({
    reducer: {
      counter: counter.reducer,
      router: connectRouter(history),
    },
    middleware,
    preloadedState,
    enhancers,
  })

  return { store, history }
}
