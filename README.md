# ts-webpack-builder

An npm package used to build other npm packages or applications that use TypeScript and webpack. 

## Why?

You could just use a `tsonfig.json` file and be done with it. But the problems with that include:
- You can't have a single output JS file unless you are using `AMD` or `System` as the `module` property. Webpack allows us to create a single JS output (although we can't have a single output TypeScript declaration file - more on that below).
- You don't get optimization, tree-shaking, etc.
- You can't run other plugins, like `babel`.

Thus, this package was born.

## Features

- Can run for both client (web) and server (node) libraries. (They require different bundling strategies that webpack handles)
- Hides webpack config for libraries behind-the-scenes so it doesn't have to be added to every project.
- Optionally can run the code through babel (and also hides it behind the scenes so it doesn't have to be added to every project)
- Includes a `watch` setting
- Can be imported and run from code or run through a CLI for direct builds from `package.json`
- Creates UMD libraries
- Also supports running webpack configurations for applications and launching via nodemon. 
  - Uses `nodemon` to do so, so it auto-restarts the application when you rebuild.

## TypeScript Declaration Files

See https://github.com/microsoft/TypeScript/issues/4433

Many hours have been spent researching the possibilities of combining declaration files into a single output. Long story short, it's not possible unless you:
- do it yourself (like those that write their own definitions for `@types`)
- create a very specialized build library to handle it
- use one of the solutions out there (like `dts-bundle-generator`) that comes with caveats

Why's it so difficult? When webpack combines into a single output file, it's because it's essentially wrapping the entire JS module environment. That's just not possible with declarations, which are more static. So the problems you run into include, for example, you wouldn't be able to name any types the same, because they will be flattened and override each other. Then on top of that, you wouldn't be able to handle the `.map` files that allow you to go directly to the source!