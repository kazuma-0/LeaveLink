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

import { chakra, GridItem } from '@chakra-ui/react';

const DashboardCard = chakra(GridItem, {
	baseStyle: {
		display: 'flex',
		flexDir: 'column',
		backgroundColor: 'white',
		minHeight: '120px',
		rounded: 'lg',
		p: '2',
		shadow: 'sm',
		outline: '1px solid #4e8c5a40',
		transition: 'all 300ms',
		// _hover: {
		// 	transform: 'scale(1.01)',
		// },
		overflowY: 'auto',
	},
});

export default DashboardCard;
