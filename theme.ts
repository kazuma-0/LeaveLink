/*
 * // Copyright (c) 2023 Anuj S and The Wired
 * //
 * // This program is free software: you can redistribute it and/or modify
 * // it under the terms of the GNU General Public License as published by
 * // the Free Software Foundation, either version 3 of the License, or
 * // (at your option) any later version.
 * //
 * // This program is distributed in the hope that it will be useful,
 * // but WITHOUT ANY WARRANTY; without even the implied warranty of
 * // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * // GNU General Public License for more details.
 * //
 * // You should have received a copy of the GNU General Public License
 * // along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

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
