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

import React, { useEffect, useReducer, useState } from 'react';
import DashboardCard from '../../../custom-components/DashboardCard';
import {
	Button,
	Center,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Select,
	useToast,
} from '@chakra-ui/react';
import { Role } from '../../../utils/Roles';
import reducer from '../../../utils/reducer';
import { useMutation, useQuery } from '@tanstack/react-query';
import client from '../../../client';
import { IconUserCheck } from '@tabler/icons';

const form = {
	name: '',
	user_id: '',
	date_of_birth: '',
	role: '',
	branchId: null,
	departmentId: null,
};
const AddStaff: React.FC = () => {
	const toast = useToast({
		variant: 'top-accent',
		position: 'bottom-right',
	});
	const { data: departments } = useQuery({
		queryKey: ['departments'],
		queryFn: async () => {
			const { data } = await client.get('/department');
			console.log(data);
			return data;
		},
	});
	const [branches, setBranches] = useState<object[]>([]);

	const [state, dispatch] = useReducer(reducer, form);
	useEffect(() => {
		if (state.departmentId !== null && state.departmentId !== 0) {
			const [department]: any = departments.filter(
				(department: any) => department.id === state.departmentId
			);
			if (!branches) return;
			setBranches(department.branches);
		} else {
			dispatch({
				type: 'departmentId',
				payload: null,
			});
		}
		console.log(state);
	}, [state.departmentId]);

	const addStaffMutation = useMutation(
		async () => {
			const { data } = await client.post('/user', state);
			return data;
		},
		{
			onSuccess(data) {
				toast({
					title: 'Successfully added staff',
					icon: <IconUserCheck />,
					status: 'success',
				});
				setBranches([]);
				dispatch({
					type: 'reset',
					payload: form,
				});
			},
			onError(err) {
				console.log(err);
				toast({
					// @ts-ignore
					description: err.response.data.message,
					title: 'Failed to add staff',
					status: 'error',
				});
			},
		}
	);

	return (
		<DashboardCard
			colSpan={4}
			rowSpan={5}
		>
			<Heading p={2}>Add Staff</Heading>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addStaffMutation.mutate();
				}}
			>
				<Center w={'full'}>
					<Flex
						gap={5}
						flexDir={'column'}
						w={'lg'}
						p={5}
					>
						{/*Name*/}
						<FormControl isRequired>
							<FormLabel>Name</FormLabel>
							<Input
								value={state.name}
								onChange={(e) =>
									dispatch({
										type: 'name',
										payload: e.target.value,
									})
								}
							></Input>
							<FormHelperText>
								Eg: B.E Computer Science and Design, B.Tech ...
							</FormHelperText>
						</FormControl>
						{/*User id / register no*/}
						<FormControl isRequired>
							<FormLabel>Register No/ User Id</FormLabel>
							<Input
								value={state.user_id}
								onChange={(e) =>
									dispatch({
										type: 'user_id',
										payload: e.target.value.toLowerCase(),
									})
								}
							></Input>
							<FormHelperText>21ku...</FormHelperText>
						</FormControl>
						{/*date_of_birth*/}
						<FormControl isRequired>
							<FormLabel>Date of birth</FormLabel>
							<Input
								// value={state.date_of_birth}
								onChange={(e) =>
									dispatch({
										type: 'date_of_birth',
										payload: e.target.value
											.replaceAll('/', '')
									})
								}
							></Input>
							<FormHelperText>Format 08/05/2003</FormHelperText>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Select Role</FormLabel>
							<Select
								onChange={(e) =>
									dispatch({
										type: 'role',
										payload: e.target.value,
									})
								}
								value={state.role}
								placeholder={'choose role'}
							>
								{Object.keys(Role).map((role) => (
									<option
										key={role}
										// @ts-ignore
										value={Role[role]}
									>
										{role}
									</option>
								))}
							</Select>
						</FormControl>
						{/*Do not show the deparment and branch form for the registrar and rd*/}
						<FormControl
							isRequired={
								![
									Role.REGISTRAR,
									Role.RESIDENT_DIRECTOR,
									Role.EDITOR,
									'',
								].includes(state.role)
							}
							isDisabled={[
								Role.REGISTRAR,
								Role.RESIDENT_DIRECTOR,
								Role.EDITOR,
								'',
							].includes(state.role)}
						>
							<FormLabel>Select Department</FormLabel>
							<Select
								onChange={(e) =>
									dispatch({
										type: 'departmentId',
										payload: +e.target.value,
									})
								}
								value={state.departmentId}
								placeholder={'choose department'}
							>
								{departments?.map((department: any) => (
									<option
										key={department.id}
										value={department.id}
									>
										{department.name}
									</option>
								))}
							</Select>
						</FormControl>
						<FormControl
							isDisabled={
								state.departmentId === null ||
								(![Role.STUDENT, Role.STAFF].includes(state.role))
							}
						>
							<FormLabel>Select Branch</FormLabel>
							<Select
								onChange={(e) =>
									dispatch({
										type: 'branchId',
										payload: +e.target.value,
									})
								}
								value={state.branchId}
								placeholder={'choose branch'}
							>
								{branches.map((branch: any) => (
									<option
										key={branch.id}
										value={branch.id}
									>
										{branch.name}
									</option>
								))}
							</Select>
						</FormControl>
						<Button
							type={'submit'}
							colorScheme={'green'}
						>
							Add Staff
						</Button>
					</Flex>
				</Center>
			</form>
		</DashboardCard>
	);
};

export default AddStaff;
