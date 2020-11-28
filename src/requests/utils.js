import { getReasonPhrase } from "http-status-codes"

import { store } from "src/setup"

export const handleErrorResponse = async function (response) {
  try {
    const body = await response.json()
    if (body.Err) {
      return new Error(body.Err)
    }
  } catch {
    return new Error(getReasonPhrase(response.status))
  }
  return new Error(getReasonPhrase(response.status))
}

export const genAPIRequester = function (conf) {
  return async function () {
    let response = await fetch(conf.endpoint(...arguments), conf.fetchOptions)

    if (response.status === (conf.expectedResponse ?? 200)) {
      if (conf.mapResponse) {
        response = await conf.mapResponse(response)
      }
      if (conf.reduxAction) {
        store.dispatch(conf.reduxAction(response))
      } else {
        return response
      }
    } else {
      return await (conf.errorHandler ?? handleErrorResponse)(response)
    }
  }
}
