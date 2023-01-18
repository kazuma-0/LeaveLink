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

import React, { MutableRefObject, useEffect, useReducer, useRef } from 'react';
import DashboardCard from '../../custom-components/DashboardCard';
import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	HStack,
	IconButton,
	Input,
	InputGroup,
	Select,
	Textarea,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { LeaveType } from '../../interfaces/LeaveType';
import { LeaveSession } from '../../interfaces/LeaveSession';
import { IconFile, IconFileUpload } from '@tabler/icons';
import { useUser } from '../../contexts/UserProvider';
import { useMutation, useQuery } from '@tanstack/react-query';
import client from '../../client';
import LeaveHistory from '../LeaveHistory';
import { useRouter } from 'next/router';
const initialFormState = {
	reason: '',
	leaveSession: '',
	leaveType: '',
	startDate: '',
	endDate: '',
	file: null,
};
const date = new Date();
const ApplyLeave: React.FC = () => {
	const [state, dispatch] = useReducer((state: any, action: any) => {
		return { ...state, [action.type]: action.payload };
	}, initialFormState);
	const fileRef = useRef(null);
	const toast = useToast({
		position: 'bottom-right',
		variant: 'left-accent',
	});
	const router = useRouter();
	const user = useUser();
	const leave = useQuery({
		queryKey: ['leave'],
		enabled: !!user,
		queryFn: async () => {
			const { data } = await client.get(
				`/leave?user_id=${user?.user_id}`
			);
			return data;
		},
	});
	const applyApproval = useMutation(
		async () => {
			const { data } = await client.post('approval', state,{
				headers:{
					"Content-Type": 'multipart/form-data'
				}
			});
			return data;
		},
		{
			onSuccess(data) {
				toast({
					title: 'Leave application applied successfully',
					status: 'success',
				});
				router.push('/dashboard');
			},
			onError(err) {
				toast({
					title: 'Failed to apply for approval',
					status: 'error',
					// @ts-ignore
					description: err.response.data.message,
				});
			},
		}
	);
	useEffect(() => {
		console.log(state);
	}, [state]);
	const fileInputRef = useRef() as MutableRefObject<HTMLInputElement>;

	return (
		<>
			<DashboardCard
				_hover={{
					transform: 'none',
				}}
				colSpan={2}
				rowSpan={5}
			>
				<Heading p={2}>Apply for leave</Heading>
				<Container pt={3}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<Flex
							gap={2}
							// display={'flex'}
							flexDir={'column'}
						>
							<FormControl isRequired>
								<FormLabel>
									What type of leave do you want to apply?
								</FormLabel>
								<Select
									placeholder={'Choose an option'}
									onChange={(event) =>
										dispatch({
											type: 'leaveType',
											payload: event.target.value,
										})
									}
								>
									<option value={LeaveType.CASUAL}>
										Casual
									</option>
									<option value={LeaveType.COMPENSATION}>
										Compensation
									</option>
									<option value={LeaveType.ON_DUTY}>
										On Duty
									</option>
									<option value={LeaveType.PERMISSION}>
										Permission
									</option>
								</Select>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>
									What type of leave do you want to apply?
								</FormLabel>
								<Select
									placeholder={'Choose an option'}
									onChange={(event) =>
										dispatch({
											type: 'leaveSession',
											payload: event.target.value,
										})
									}
								>
									<option value={LeaveSession.FORENOON}>
										Forenoon
									</option>
									<option value={LeaveSession.AFTERNOON}>
										Afternoon
									</option>
									<option value={LeaveSession.FULLDAY}>
										Full day
									</option>
								</Select>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Starting date</FormLabel>
								<Input
									onChange={(event) =>
										dispatch({
											type: 'startDate',
											payload: event.target.value,
										})
									}
									min={date.toLocaleDateString('en-CA')}
									type={'date'}
								></Input>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Ending date</FormLabel>
								<Input
									onChange={(event) =>
										dispatch({
											type: 'endDate',
											payload: event.target.value,
										})
									}
									disabled={!state.startDate}
									min={state.startDate}
									type={'date'}
								></Input>
								<FormHelperText>
									Select the same date if you are applying
									leave for one day
								</FormHelperText>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Reason</FormLabel>
								<Textarea
									onChange={(event) =>
										dispatch({
											type: 'reason',
											payload: event.target.value,
										})
									}
								></Textarea>
								<FormHelperText
									hidden={
										state.leaveType !==
										LeaveType.COMPENSATION
									}
								>
									Please provide the date&apos;s for which the
									compensation leave&apos;s are applied for.
								</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel>Attachments</FormLabel>
								<Box display={'flex'}>
									<IconButton
										onClick={() =>
											fileInputRef.current.click()
										}
										w={'full'}
										aria-label={'file'}
									>
										<IconFileUpload />
									</IconButton>
								</Box>
								<Input
									type={'file'}
									accept={'.pdf'}
									hidden
									ref={fileInputRef}
									onChange={(e) =>
										dispatch({
											type: 'file',
											// @ts-ignore TODO: Add checks
											payload: e.target.files[0],
										})
									}
								></Input>
								<FormHelperText
									hidden={state.attachment !== null}
								>
									Select a file to upload (Only pdf files are
									accepted)
								</FormHelperText>
								<FormHelperText
									hidden={state.attachment === null}
								>
									{state.attachment?.name} ready for upload
								</FormHelperText>
							</FormControl>
							<HStack alignSelf={'end'}>
								<Button
									onClick={() => applyApproval.mutate()}
									colorScheme={'whatsapp'}
								>
									Apply for leave
								</Button>
							</HStack>
						</Flex>
					</form>
				</Container>
			</DashboardCard>
			<Box>
				{/*@ts-ignore*/}
				<LeaveHistory leave={leave} />
			</Box>
		</>
	);
};

export default ApplyLeave;
