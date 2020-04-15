# ts-webpack-builder

An npm package used to build other npm packages or applications that use TypeScript and webpack. 

## Why?

Why use webpack to create libraries? You could just use a `tsconfig.json` file and be done with it. But the problems with that include:
- You can't have a single output JS file unless you are using `AMD` or `System` as the `module` property. Webpack allows us to create a single JS output (although we can't have a single output TypeScript declaration file - more on that below).
- You don't get optimization, tree-shaking, etc.
- You can't run other plugins, like `babel`.

Thus, this package was born.

## Features

- Can run for both client (web) and server (node) libraries. (They require different bundling strategies that webpack handles.)
- Hides webpack config for libraries behind-the-scenes so it doesn't have to be added to every project.
- Optionally can run the code through babel (and also hides it behind the scenes so it doesn't have to be added to every project).
- Includes a `watch` setting.
- Can be imported and run from code or run through a CLI for direct builds from `package.json`.
- Creates UMD libraries.
- Also supports running webpack configurations for applications 
  - Uses `nodemon` to do so, so it auto-restarts the application when you rebuild.

## Build

Build with `npm start`. That runs the webpack build (meta, right) to create this library, then runs the `tsc` command to build the cli.

## Use

To use in a project, you can use `npm link`:
- In the root of this project, run `npm link`. That basically installs this package in the npm global space for this machine.
- In the project you want to use, run `npm link ts-webpack-builder`. That finds the global installation and binds it into that project. 
Note, the `ts-webpack-builder` won't show up in the `package.json` dependencies. That's just not how `npm link` works. But it will show up in `node_modules` (symlink).

Once this tool is added to the consuming project, you can either create a script in that project to call into this tool (like a `runner.ts`) or you can use the CLI.
See the `test` folder for more information on both. The CLI should be improved in the future to be more customizable / have better shortcuts.

In your package.json:
```json
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
```

## CLI

The CLI exists in the `cli` folder. It is built separately from the rest of the code in `src` and is actually bound to the built code in `dist` folder (so that it only uses the types and doesn't try to transpile anything in `src` - that's also why it doesn't get put into `dist` after transpilation).

When installed in the consuming project, the CLI is accessible at `./node_modules/.bin/ts-webpack-builder`. You can run it like that or call `npx ts-webpack-builder`. Or you can set up a custom command through `package.json`:

```json
{
  "scripts": {
    "start-cli": "ts-webpack-builder",
  },
}
```
You can pass in any arguments there as well.

The CLI does not require you to pass in an `absoluteRoot` property. It can use a babel config file.

The CLI only works for libraries right now. I don't have a good test case for an application (yet).

## Development

Typical steps are:
- Make a change, save, then call `npm start` in the root of this project to do the webpack build and the CLI build.
- `cd test` to go into the test.
- Run the tests (see the `test` README)

There are some times where you may need to call `npm unlink ts-webpack-builder` in test, then re-link, but that may have just been because I did something wrong.

This project uses a common `tsconfig.json`. 

Future tasks:
- Add a test for the application workflow.
- Add CLI support for the application workflow.
- Add a test for babel.
- Once this project is stable, publish it to npm and start using it heavily across all projects.

## Babel

Use of babel is not tested. It probably doesn't work yet. The idea is as such:

- If using a script file to run the build, you can pass the babel config through `babelConfig` as an object.
- Through the CLI, you can provide the path to a babel config (which could be a JS or JSON file).

In both cases, you need to install your presets as dev dependencies in the consuming project - `ts-webpack-builder` does not have any.

## TypeScript Declaration Files

Every time I create a library, I question why I can't bundle TypeScript Definition files like I bundle JavaScript files. Answer: because it's a huge hassle and not worth the time.

See https://github.com/microsoft/TypeScript/issues/4433

Many hours have been spent researching the possibilities of combining declaration files into a single output. Long story short, it's not possible unless you:
- do it yourself (like those that write their own definitions for `@types`)
- create a very specialized build library to handle it
- use one of the solutions out there (like `dts-bundle-generator`) that comes with caveats

Why's it so difficult? When webpack combines into a single output file, it's because it's essentially wrapping the entire JS module environment. That's just not possible with declarations, which are more static. So the problems you run into include, for example, you wouldn't be able to name any types the same, because they will be flattened and override each other. Then on top of that, you wouldn't be able to handle the `.map` files that allow you to go directly to the source!
