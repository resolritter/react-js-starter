# Before building for production

Generate the environment for building the assets

```sh
node ./scripts/assemble_production_build_env.js
```

# Development setup

- `npm install`
- `npm start`

# Runtime features

## `master` branch

- Renderer: `react`
- Router: `connected-react-router`
- State management: `react-redux`
- CSS: `linaria`
- Utility library: `lodash`

### Included packages

- `@reduxjs/toolkit` allows for creating reducers with less boilerplate. It's
  also useful outside of Redux (see `LocalIncrementButton.js`).
- `useForceUpdate` for triggering updates manually when needed - I used to rely
  on `react-use`'s `useCounter` for this, but not anything else in that library,
  so it felt like overkill bringing the whole package for this one use-case
  which is more 1. more perfomant than incrementing counters and 2. doesn't
  incur MAX_INT invariants from the JS runtime.
- `@svgr/webpack` allows importing SVGs as React components.
