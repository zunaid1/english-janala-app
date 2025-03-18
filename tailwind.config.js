/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		fontFamily: {
		  hind: ["Hind Siliguri", "sans-serif"], // Register Hind Siliguri
		},
	  },
	},
	plugins: [],
  };
  



// /** @type {import('tailwindcss').Config} */
// module.exports = {
// 	content: ["./src/**/*.{html,js}"],
// 	theme: {
// 	  extend: {},
// 	},
// 	plugins: [],
//   }