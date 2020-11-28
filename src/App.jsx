import * as React from "react"
import { Route, Switch } from "react-router"

import FetchTodo from "src/components/FetchTodo"
import LocalIncrementButton from "src/components/LocalIncrementButton"
import StoreIncrementButton from "src/components/StoreIncrementButton"

export const App = function () {
  return (
    <div>
      <LocalIncrementButton />
      <StoreIncrementButton />
      <FetchTodo />
    </div>
  )
}

export const ConnectedApp = function () {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route
        component={function NotFound() {
          return <div>404</div>
        }}
      />
    </Switch>
  )
}

export default ConnectedApp
