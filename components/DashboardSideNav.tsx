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

import { Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { IconHome2, IconTableAlias } from '@tabler/icons';
import React from 'react';

const DashboardSideNav: React.FC<{
	components: any;
	setActiveComponent: React.Dispatch<any>;
	setActiveHome: () => void;
}> = ({ components, setActiveComponent, setActiveHome }) => {
	return (
		<Box
			h={'full'}
			w={'60'}
			p={'4'}
		>
			<Box
				rounded={'lg'}
				bgColor={'#071a2f'}
				h={'full'}
				w={'full'}
				p={2}
				userSelect={'none'}
			>
				<Center p={2}>
					<Image
						alt={'Kahe logo'}
						src={'/kahe.white.png'}
					></Image>
				</Center>
				<Flex
					onClick={() => setActiveHome()}
					p={2}
					py={3}
					cursor={'pointer'}
					rounded={'lg'}
					transition={'all 300ms'}
					_hover={{
						bgColor: '#001e3c',
						shadow: '0 0 20px #00000030',
						outline: '1px solid #205184',
					}}
				>
					<IconHome2 />
					<Text pl={2}>Home</Text>
				</Flex>
				{components.map((component: any) => {
					return (
						<Flex
							key={component.name}
							onClick={() =>
								setActiveComponent(component.component)
							}
							p={2}
							py={3}
							cursor={'pointer'}
							rounded={'lg'}
							transition={'all 300ms'}
							_hover={{
								bgColor: '#001e3c',
								shadow: '0 0 20px #00000030',
								outline: '1px solid #205184',
							}}
						>
							{component.icon}
							<Text pl={2}>{component.label}</Text>
						</Flex>
					);
				})}
			</Box>
		</Box>
	);
};

export default DashboardSideNav;
