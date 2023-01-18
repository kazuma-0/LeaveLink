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

import DashboardCard from '../../../custom-components/DashboardCard';
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Grid,
	Heading,
	Input,
	useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import client from '../../../client';

const AddFaculty: React.FC = () => {
	const toast = useToast({
		position: 'bottom-right',
		variant: 'top-accent',
	});
	const [facultyName, setFacultyName] = useState('');
	const { data } = useQuery({
		queryKey: ['faculties'],
		queryFn: async () => {
			const { data } = await client.get('/faculty');
			return data;
		},
	});
	const addFacultyMutation = useMutation(
		async () => {
			await client.post('/faculty', {
				name: facultyName,
			});
		},
		{
			onSuccess(data) {
				toast({
					title: 'Faculty added successfully',
					status: 'success',
				});
				setFacultyName('');
			},
			onError(err) {
				toast({
					// @ts-ignore
					description: err.response.data.message,
					status: 'error',
					title: 'Failed to add faculty',
				});
			},
		}
	);
	return (
		<DashboardCard
			colSpan={4}
			rowSpan={5}
		>
			<Grid gridTemplateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}>
				<Box>
					<Heading p={2}>Add Faculty</Heading>
					<form>
						<Center w={'full'}>
							<Flex
								gap={5}
								flexDir={'column'}
								w={'lg'}
								p={5}
							>
								<FormControl>
									<FormLabel>Name</FormLabel>
									<Input
										value={facultyName}
										onChange={(e) =>
											setFacultyName(e.target.value)
										}
									></Input>
									<FormHelperText>
										Eg: Faculty of Engineering, Faculty of
										...
									</FormHelperText>
								</FormControl>
								{/*<FormControl>*/}
								{/*	<FormLabel>Short Name</FormLabel>*/}
								{/*	<Input></Input>*/}
								{/*</FormControl>*/}
								<Button
									onClick={() => addFacultyMutation.mutate()}
									colorScheme={'green'}
								>
									Add Faculty
								</Button>
							</Flex>
						</Center>
					</form>
				</Box>
				<Box>
					<Box w={'full'}>
						<Heading pb={3}>Available Faculties</Heading>
						{data?.map((faculty: any) => (
							<Box
								p={3}
								bgColor={'secondary'}
								color={'white'}
								rounded={'lg'}
								key={faculty.id}
							>
								{faculty.name}
							</Box>
						))}
					</Box>
				</Box>
			</Grid>
		</DashboardCard>
	);
};

export default AddFaculty;
