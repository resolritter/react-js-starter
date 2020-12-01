import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router } from "react-router-dom"

import App from "./App"
import { history, store } from "./setup"

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app"),
)
