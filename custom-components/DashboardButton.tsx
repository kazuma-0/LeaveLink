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

import { Box, chakra, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const DashBoardButton = chakra(Flex, {
  baseStyle: {
    cursor: 'pointer',
    p: 3,
    bgColor: '',
    color: 'white',
    rounded: 'lg',
    userSelect: 'none',
    transition: 'all 300ms',
    _hover: {
      bgColor: '#ffffff20',
      shadow: '0 0 10px #00000010',
    },
  },
});
export default DashBoardButton;
