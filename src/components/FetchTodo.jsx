import React from "react"
import { get as fpGet } from "lodash/fp"
import { useSelector } from "react-redux"

import { loadTodo } from "src/requests/todo"

export const FetchTodoButton = function () {
  const { todo, updateTime } = useSelector(fpGet("todo"))
  const todoUpdateTimeRef = React.useRef()
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(
    function () {
      if (isLoading && todoUpdateTimeRef.current !== updateTime) {
        todoUpdateTimeRef.current = updateTime
        setIsLoading(false)
      }
    },
    [setIsLoading, isLoading, todoUpdateTimeRef, updateTime],
  )

  return (
    <div>
      <p>
        <button
          disabled={isLoading}
          onClick={
            isLoading
              ? undefined
              : function () {
                  setIsLoading(true)
                  loadTodo({ id: 1 })
                }
          }
        >
          Load TODO from external API into Redux
        </button>
      </p>
      <code>{todo ? JSON.stringify(todo) : ""}</code>
    </div>
  )
}

export default FetchTodoButton
