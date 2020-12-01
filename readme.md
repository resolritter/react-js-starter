# Feature outline

- Renderer: `react`
- Router: `react-router-dom`
- State management: `react-redux`
- CSS: `linaria`
- Utility library: `lodash`

There's also a theme support implementation in a separate branch (**with-theme**).
Bear in mind that branch is not actively maintained, so it's likely to not include
everything that's also included in the master branch.

# Supporting packages

- `@reduxjs/toolkit` allows for creating reducers with less boilerplate. It's
  for component-specific reducers.
- `@svgr/webpack` allows importing SVGs as React components.
- `useForceUpdate` for triggering manual component updates where necessary.

# How to run

First of all, install the dependencies

```
npm install
```

# Building

- `npm run build` will build optimizing for production

- `npm run build:analyze` does the same as `build`, plus shows more information
  about the bundle size

# Developing

Note: Environment variables can be set from the `.env` file at the root of this
repository.

`npm run start`
