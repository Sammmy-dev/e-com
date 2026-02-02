/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					olive: "#6B7447",
					terracotta: "#A45A3F",
				},
				neutral: {
					greige: "#8F857B",
					sand: "#E3CDB5",
					background: "#D9C7AE",
				},
				accent: {
					oliveDark: "#4F5835",
					brownMuted: "#7A4E3A",
				},
			},
		},
	},
	plugins: [],
};
