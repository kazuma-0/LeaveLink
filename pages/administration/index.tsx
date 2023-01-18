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
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue, useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import client from '../../client';
import { IconInfoSquareRounded } from '@tabler/icons';
import { useRouter } from 'next/router';

export default function Administration() {
	const router = useRouter()
	const [user_id, setUser_id] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const toast = useToast({
		position: 'bottom-right',
		isClosable: true,
		variant: 'top-accent',
	});
	const userLoginMutation = useMutation(async () => {
		if (!password || !user_id)
			throw new Error('Please fill all fields');
		const { data } = await client.post('/auth/login', {
			user_id: user_id,
			password: password,
		});
		return data;
	}, {
		onSuccess(data) {
			toast({
				title: 'Login successful',
				status: 'success',
				description: 'redirecting to login page'
			});
			if(!['EDITOR', 'REGISTRAR'].includes(data.user.role)){
				// localStorage.clear();
				throw new Error('Invalid role')
			}
			localStorage.setItem('token', data['access_token']);
			localStorage.setItem('user', JSON.stringify(data['user']))
			client.defaults.headers.common[
				'Authorization'
				] = `Bearer ${data['access_token']}}`;
			setTimeout(() => {
				router.push('/administration/dashboard');
			}, 3e3);
		},
		onError(err) {
			console.log(err)
			toast({
				title: 'Login failed',
				status: 'error',
				// @ts-ignore
				description: err.message
			});
		},
	})
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={'gray.50'}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'} textAlign={'center'}>Karpagam Academy of Higher Education</Heading>
					<Flex  as={Text} fontSize={'lg'} gap={2} color={'gray.600'}>
						<IconInfoSquareRounded /> This login is only meant for Registrar and editors
					</Flex>
				</Stack>
				<Box
					rounded={'lg'}
					bg={'white'}
					boxShadow={'lg'}
					p={8}>
					<Stack spacing={4}>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input onChange={(e)=>setUser_id(e.target.value)} type="email" />
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input onChange={(e)=>setPassword(e.target.value)} type="password" />
						</FormControl>
						<Stack spacing={10}>

							<Button
								onClick={()=>userLoginMutation.mutate()}
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}