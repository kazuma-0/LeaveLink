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
	Select,
	useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import client from '../../../client';

const AddDepartment: React.FC = () => {
	const toast = useToast({
		position: 'bottom-right',
		variant: 'top-accent',
	});
	const [departmentName, setdepartmentName] = useState('');
	const [facultyId, setFacultyId] = useState<string | undefined>();
	const [{ data: faculties }, { data: departments }] = useQueries({
		queries: [
			{
				queryKey: ['faculties'],
				queryFn: async () => {
					const { data } = await client.get('/faculty');
					return data;
				},
			},
			{
				queryKey: ['departments'],
				queryFn: async () => {
					const { data } = await client.get('/department');
					return data;
				},
			},
		],
	});
	const addDepartmentMutation = useMutation(
		async () => {
			await client.post('/department', {
				name: departmentName,
				facultyId: Number(facultyId),
			});
		},
		{
			onSuccess(data) {
				toast({
					title: 'Department added successfully',
					status: 'success',
				});
				setdepartmentName('');
				setFacultyId(undefined);
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
					<Heading p={2}>Add Department</Heading>
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
										value={departmentName}
										onChange={(e) =>
											setdepartmentName(e.target.value)
										}
									></Input>
									<FormHelperText>
										Eg: Department of Computer Science and
										Engineering, Department of ...
									</FormHelperText>
								</FormControl>
								<FormControl>
									<FormLabel>Select Faculty</FormLabel>
									<Select
										onChange={(e) =>
											setFacultyId(e.target.value)
										}
										placeholder={'choose faculty'}
									>
										{faculties?.map((faculty: any) => (
											<option
												value={faculty.id}
												key={faculty.name}
											>
												{faculty.name}
											</option>
										))}
									</Select>
								</FormControl>
								<Button
									onClick={() =>
										addDepartmentMutation.mutate()
									}
									colorScheme={'green'}
								>
									Add Department
								</Button>
							</Flex>
						</Center>
					</form>
				</Box>
				<Box>
					<Box w={'full'}>
						<Heading pb={3}>Departments</Heading>
						{departments?.map((department: any) => (
							<Box
								p={3}
								bgColor={'secondary'}
								color={'white'}
								rounded={'lg'}
								key={department.id}
							>
								{department.name}
							</Box>
						))}
					</Box>
				</Box>
			</Grid>
		</DashboardCard>
	);
};

export default AddDepartment;
