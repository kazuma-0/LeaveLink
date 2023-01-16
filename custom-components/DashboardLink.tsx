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
import {Box, chakra} from '@chakra-ui/react';
import Link from 'next/link';

const DashboardLink = chakra(Box, {
	baseStyle: {
		display: 'flex',
		cursor: 'pointer',
		padding: '3',
		paddingLeft: '5',
		alignItems: 'center',
		rounded: 'xl',
		position: 'relative',
		transition: 'all 0.2s',
		_after: {
			content: '""',
			transition: 'all 0.2s',
		},
		_hover: {
			color: 'secondary',
			_after: {
				content: '""',
				position: 'absolute',
				top: 0,
				left: 0,
				width: '2px',
				bgColor: 'secondary',
				height: '100%',
			},
		},
	},
});
export default DashboardLink;
