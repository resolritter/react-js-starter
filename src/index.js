import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import App from "./app"
import { store, history } from "./setup"
import { setTheme, initialTheme } from "./theme"

setTheme(initialTheme)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app"),
)
