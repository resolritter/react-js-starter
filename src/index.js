import * as React from "react"
import { ConnectedRouter } from "connected-react-router"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"

import App from "./App"
import { history, store } from "./setup"

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app"),
)
