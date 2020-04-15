# ts-webpack-builder tests

This is a test directory space. See the main project README for more information.

As stated in the other README, there are a couple different ways to run tests.

1. From the API, using `buildLibrary`
2. From the CLI, using `ts-webpack-builder` (see other README for specifics)

All the tests:

```bash
# First, build the runner
npm run runner

# Run from API with runner, with no arg (does default)
npm start

# Run from API with runner, using a config name provided in runner (same result)
npm start -- build:once

# Run from API with runner, using the watch config name
npm start -- build:watch

# Run from CLI 
npx ts-webpack-builder

# Run from CLI via package.json
npm run start-cli
```

After each, you can run
```bash
npm run test
```

To run the test, which should just print to console.

## What it also shows about project setup

Note:
- `package.json` dependencies are few - only the things really needed.
- You have the `runner` folder, but it's optional. You could just use the CLI.
- No need for a webpack config that is copied from somewhere else.
- Do still need the tsconfig.json, unfortunately.
- Automatically cleans the `dist` folder.
- Because we are using mapping, you can `F12` right into the code!