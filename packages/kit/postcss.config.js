const path = require("path");
const VARIABLE_PATH = path.resolve(__dirname, "src/variables");

module.exports = {
	plugins: [
		require("postcss-preset-env")({
			stage: 0,
			preserve: true,
			autoprefixer: { grid: true },
			importFrom: [
				`${VARIABLE_PATH}/media.css`,
				`${VARIABLE_PATH}/colors.css`,
				`${VARIABLE_PATH}/spacing.css`,
				`${VARIABLE_PATH}/typography.css`,
			],
		}),
		require("cssnano")({
			preset: "default",
		}),
	],
};
