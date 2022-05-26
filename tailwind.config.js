const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./content/**/*.{md,yml,json,yaml,toml,csv}",
		"./app.vue",
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: colors.violet[700],
					...colors.violet,
				},
			},
			fontFamily: {
				sans: ["Inter"],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
