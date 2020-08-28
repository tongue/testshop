const gulp = require("gulp");
const path = require("path");
const store = require("gulp-svgstore");
const min = require("gulp-svgmin");
const inject = require("gulp-inject");
const resolve = require("cli-path-resolve");

const ICON_PATH = path.resolve(__dirname, "../assets/icons");

function injectSvg({ f }) {
	const htmlFile = resolve(f);
	const svgs = gulp
		.src(`${ICON_PATH}/*.svg`)
		.pipe(min())
		.pipe(store({ inlineSvg: true }));

	function fileContents(_, file) {
		return file.contents.toString();
	}

	return gulp
		.src(htmlFile)
		.pipe(inject(svgs, { transform: fileContents }))
		.pipe(gulp.dest(path.dirname(htmlFile)));
}

module.exports = injectSvg;
