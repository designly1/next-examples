import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				designlyLeft: '#1C99FE',
				designlyMiddle: '#7644FF',
				designlyRight: '#FD4766',
			},
			animation: {
				flash: 'pulse 0.8s ease-in-out infinite',
				bounceFast: 'bounce 0.4s linear infinite',
				fadeGreenToWhite: 'fade-green-to-white 3s ease-in-out infinite',
			},
			keyframes: {
				'fade-green-to-white': {
					'0%': { backgroundColor: '#00FF00' },
					'100%': { backgroundColor: '#FFFFFF' },
				},
			},
			fontFamily: {
				spalding: ['Spalding', 'sans-serif'],
				mono: 'var(--font-mono)',
				inter: 'var(--font-inter)',
			},
		},
	},
	plugins: [
		require('daisyui'),
		plugin(function ({ addBase }) {
			addBase({
				'@font-face': {
					fontFamily: 'Spalding',
					src: `
            url('/assets/fonts/spalding.woff2') format('woff2'),
            url('/assets/fonts/spalding.woff') format('woff'),
            url('/assets/fonts/spalding.ttf') format('truetype'),
            url('/assets/fonts/spalding.otf') format('opentype');
          `,
					fontWeight: 'normal',
					fontStyle: 'normal',
				},
			});
		}),
	],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#1C99FE',
					secondary: '#7644FF',
					accent: '#FD4766',
					neutral: '#2b3440',
					'base-100': '#ffffff',
					info: '#3abff8',
					success: '#36d399',
					warning: '#fbbd23',
					error: '#f87272',
				},
			},
		],
	},
};
export default config;
