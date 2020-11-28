# Before building for production

Generate the environment for building the assets

```sh
node ./scripts/assemble_production_build_env.js
```

# Development setup

- `npm install`
- `npm start`

# Feature outline

- Renderer: `react`
- Router: `connected-react-router`
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
