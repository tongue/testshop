#! /usr/bin/env node
const minimist = require("minimist");
const svg = require("./commands/inject-svg");
const css = require("./commands/build-css");

const args = minimist(process.argv.slice(2));
const cmd = args._[0];

switch (cmd) {
	case "inject-svg":
		svg(args);
		break;
	case "build-css":
		css(args);
		break;
	default:
		console.error(`"${cmd}" is not a valid command`);
		break;
}
