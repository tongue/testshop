const path = require("path");
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const gulp = require("gulp");
const resolve = require("cli-path-resolve");

const SRC_PATH = path.resolve(__dirname, "../src");
const CSS_GLOB = [`${SRC_PATH}/**/*.css`];

function buildCss({ d, watch }) {
	const destination = resolve(d);
	function css() {
		return gulp
			.src(CSS_GLOB)
			.pipe(postcss())
			.pipe(concat("global.min.css"))
			.pipe(gulp.dest(destination));
	}

	if (watch) {
		gulp.watch(CSS_GLOB, css);
	} else {
		css();
	}
}

module.exports = buildCss;
