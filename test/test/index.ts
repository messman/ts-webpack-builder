//// <reference path="../dist/index.d.ts"/>
// ^ Have to do the above because we aren't accessing as an npm package.

import { introduceSelf } from "../dist/index";

console.log(introduceSelf("World"));