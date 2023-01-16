import { extendTheme } from '@chakra-ui/react';
import { Rubik, Manrope } from '@next/font/google';
const manrope = Manrope();
const inter = Rubik();
const theme = extendTheme({
	config: {
		initialColorMode: 'white',
	},
	fonts: {
		heading: manrope.style.fontFamily,
		body: inter.style.fontFamily,
	},
	colors: {
		primary: '#fbfcff',
		secondary: '#4e8c5a',
	},
	sizes: {
		container: {
			xxl: 'calc(100vw - 1%)',
		},
	},
	styles: {
		global: () => ({
			body: {
				bg: '#f0f0f0',
				// color: 'white',
			},
		}),
	},
});
export default theme;
