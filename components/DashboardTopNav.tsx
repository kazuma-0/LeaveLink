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

import {
	Box,
	Container,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	HStack,
	IconButton,
	Image,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { IconNotification, IconUser } from '@tabler/icons';
import React from 'react';
import { useUser } from '../contexts/UserProvider';
import { useIsFetching } from '@tanstack/react-query';
import Loader from './Loader';

const DashboardTopNav: React.FC = ({}) => {
	const userMenu = useDisclosure();
	const user = useUser();
	const loading = useIsFetching({});
	return (
		<>
			{!!loading && <Loader />}
			<Box
				h={16}
				shadow={'sm'}
				bgColor={'#ffffff'}
				// justifyContent={'space-between'}
				// alignItems={'center'}
			>
				<Container
					display={'flex'}
					maxW={'container.xxl'}
					h={'full'}
					justifyContent={'space-between'}
				>
					<Image
						alt={'logo'}
						src={'/kahe.long.png'}
					></Image>
					<HStack
						spacing={5}
						px={'10'}
					>
						<IconButton
							rounded={'full'}
							aria-label={'Notification'}
							icon={<IconNotification />}
						/>
						<IconButton
							rounded={'full'}
							aria-label={'User'}
							icon={<IconUser />}
							onClick={userMenu.onOpen}
						></IconButton>
					</HStack>
				</Container>
			</Box>
			<Drawer
				isOpen={userMenu.isOpen}
				onClose={userMenu.onClose}
				placement={'right'}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader
						display={'flex'}
						borderBottomWidth='1px'
					>
						Good Morning,{' '}
						<Text textTransform={'capitalize'}>
							{'Kishore Vel'}
						</Text>
					</DrawerHeader>
					<DrawerBody>Designation {user?.role}</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default DashboardTopNav;
