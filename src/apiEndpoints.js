export const todoEndpoints = {
  get: function ({ id }) {
    return `https://jsonplaceholder.typicode.com/todos/${id}`
  },
}
