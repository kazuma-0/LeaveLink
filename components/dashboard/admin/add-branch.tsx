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
	HStack,
	Input,
	Select,
	useToast,
	VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import client from '../../../client';

const AddBranch: React.FC = () => {
	const toast = useToast({
		position: 'bottom-right',
		variant: 'top-accent',
	});
	const [branchName, setBranchName] = useState('');
	const [departmentId, setDepartmentId] = useState<string | undefined>();
	const [{ data: departments }, { data: branches }] = useQueries({
		queries: [
			{
				queryKey: ['departments'],
				queryFn: async () => {
					const { data } = await client.get('/department');
					return data;
				},
			},
			{
				queryKey: ['branches'],
				queryFn: async () => {
					const { data } = await client.get('/branch');
					return data;
				},
			},
		],
	});
	const addFacultyMutation = useMutation(
		async () => {
			await client.post('/branch', {
				name: branchName,
				departmentId: Number(departmentId),
			});
		},
		{
			onSuccess(data) {
				toast({
					title: 'Branch added successfully',
					status: 'success',
				});
				setBranchName('');
				setDepartmentId(undefined);
			},
			onError(err) {
				toast({
					// @ts-ignore
					description: err.response.data.message,
					status: 'error',
					title: 'Failed to add Branch',
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
					<Heading p={2}>Add Branch</Heading>
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
										value={branchName}
										onChange={(e) =>
											setBranchName(e.target.value)
										}
									></Input>
									<FormHelperText>
										Eg: B.E Computer Science and Design,
										B.Tech ...
									</FormHelperText>
								</FormControl>
								<FormControl>
									<FormLabel>Select Department</FormLabel>
									<Select
										onChange={(e) =>
											setDepartmentId(e.target.value)
										}
										value={departmentId}
										placeholder={'choose an option'}
									>
										{departments?.map((department: any) => (
											<option
												value={department.id}
												key={department.id}
											>
												{department.name}
											</option>
										))}
									</Select>
								</FormControl>
								<Button
									onClick={() => addFacultyMutation.mutate()}
									colorScheme={'green'}
								>
									Add Branch
								</Button>
							</Flex>
						</Center>
					</form>
				</Box>
				<Box>
					<Box w={'full'}>
						<Heading pb={3}>Branches</Heading>
						<Flex
							flexDir={'column'}
							gap={3}
						>
							{branches?.map((department: any) => (
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
						</Flex>
					</Box>
				</Box>
			</Grid>
		</DashboardCard>
	);
};

export default AddBranch;
