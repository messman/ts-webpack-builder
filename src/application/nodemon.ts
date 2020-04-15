import * as nodemon from "nodemon";

export function runNodemon(file: string): void {
	nodemon({
		verbose: true,
		script: file,
		watch: [file],
		stdout: true,
		env: {
			"NODE_ENV": "development"
		}
	})
		.on("log", function (event: nodemon.LogMessage) {
			// https://github.com/remy/nodemon/blob/master/doc/events.md
			// Outputs the color messages from nodemon
			console.log(event.colour);
		})
		.on('quit', function () {
			console.log('nodemon has quit');
			process.exit();
		})
		.on('restart', function () {
			process.env.NODEMON_STATUS = 'restarted';
		});
}