import * as React from "react"
import { Route, Switch } from "react-router"
import { useSelector } from "react-redux"
import { useRef, useEffect } from "react"
import ChangeThemeButton from "src/components/ChangeThemeButton"
import StoreIncrementButton from "src/components/StoreIncrementButton"
import LocalIncrementButton from "src/components/LocalIncrementButton"
import { getRootElement } from "./utils"

export function App() {
  return (
    <div>
      <ChangeThemeButton />
      <LocalIncrementButton />
      <StoreIncrementButton />
    </div>
  )
}

function ConnectedApp() {
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
