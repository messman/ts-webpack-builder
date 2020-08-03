# ts-webpack-builder tests

This is a test directory space. See the main project README for more information.

As stated in the other README, there are a couple different ways to run tests.

1. From the API, using `buildLibrary`
2. From the CLI, using `ts-webpack-builder` (see other README for specifics) (calls `buildLibrary`)

Note that `tswb.js`, the config file, is present in this directory and will be used by default.

All the tests:

```bash
# Run from API with runner.js, with no arg (does default from runner.js)
npm run test-runner

# Run from API with runner, using a config name provided in runner (same result)
npm run test-runner -- build:once

# Run from API with runner, using the watch config name
npm run test-runner -- build:watch

# Run from CLI without relying on package.json scripts
npx ts-webpack-builder

# Run from CLI via package.json, which will use `tswb.js`
npm run test-cli

# Run from CLI via package.json, overriding the previous result to use debug
npm run test-cli -- --isDebug=true

# Run from CLI via package.json with the same output as above test
npm run test-cli-log

# Run from CLI via package.json, which will use `nonexistent.js` and spit out a warning
npm run test-cli-bad-config-file

# Run from CLI via package.json and call into a separate config file (should not apply anything, since the config is a dictionary)
npm run test-cli-multi

# Run from CLI via package.json and call into tswb.multi.js, config one
npm run test-cli-multi-one

# Run from CLI via package.json and call into tswb.multi.js, config two
npm run test-cli-multi-one

# Run from CLI via package.json and call into tswb.multi.js, config three (should error)
npm run test-cli-multi-three
```

After each, you can run
```bash
npm run verify-output
```

To run the test, which should just print to console.

## What it also shows about project setup

Note:
- `package.json` dependencies are few - only the things really needed.
- You have the `runner.js` file, but it's optional. You could just use the CLI.
- You have the `tswb.js` config file, which is also optional. `tswb.js` is used by default if it exists, but can be customized to any file name.
- No need for a webpack config that is copied from somewhere else.
- Do still need the tsconfig.json, unfortunately.
- Automatically cleans the `dist` folder.
- Because we are using mapping, you can `F12` right into the code!