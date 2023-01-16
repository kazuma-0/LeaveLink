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

import {NextPage} from 'next';
import DashboardTopNav from '../../../components/DashboardTopNav';
import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	Container,
	Flex,
	Grid,
	Heading,
	Highlight,
	HStack,
	Text,
	useToast,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {useMutation, useQuery} from '@tanstack/react-query';
import client from '../../../client';
import React from 'react';
import DashboardCard from '../../../custom-components/DashboardCard';
import LeaveHistory from '../../../components/LeaveHistory';
import {useUser} from "../../../contexts/UserProvider";
import {ApprovalStatus} from "../../../interfaces/ApprovalStatus";
import approvalQuery from "../../../utils/data/approvalQuery";
import {IconUserCheck} from "@tabler/icons";

const date = new Date();
const Approvals: NextPage = () => {
	const router = useRouter();
	const user = useUser();
	const { uuid } = router.query;
	const approval = useQuery({
		queryKey: ['approvals'],
		queryFn: async () => {
			const { data } = await client.get(`approval/?id=${uuid}`);
			return data;
		},
	});
	const toast = useToast({
		position: 'bottom-right',
		// description: ''
		variant: 'left-accent'
	})
	const leave = useQuery({
		enabled: !!approval.data,
		queryFn: async () => {
			const { data } = await client.get(
				`leave/?user_id=${approval.data[0].user_id}&month=${
					date.getMonth() + 1
				}&year=${date.getFullYear()}`
			);
			return data;
		},
		queryKey: ['leaves'],
	});
	const mutation = useMutation(async (status: ApprovalStatus)=>{
		const data = await client.patch(`/approval/approve/${uuid}`,{
            // @ts-ignore
			[approvalQuery[user.role]]: status
		})
		console.log(data.data)
		return data;
	},{
		onSuccess(){
			toast({
				title: 'Approved',
				icon: <IconUserCheck/>,
				status: "success"
			})
			setTimeout(()=>{
				router.push('/dashboard');
			},2e3);
		}
	})

	return (
		<>
			<DashboardTopNav />
			<Container maxW={'container.xxl'}>
				<Heading></Heading>
				<Grid
					gridTemplateColumns={'repeat(2, 1fr)'}
					h={'calc(100vh - 64px)'}
				>
					<Flex
						py={3}
						flexDir={'column'}
					>
						<Breadcrumb pb={3}>
							<BreadcrumbItem>
								<BreadcrumbLink href='/dashboard'>
									dashboard
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem>
								<BreadcrumbLink href='/dashboard/#approvals'>
									approvals
								</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbItem isCurrentPage>
								<BreadcrumbLink
									href={`dashboard/approvals/${uuid}`}
								>
									{uuid}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</Breadcrumb>
						<DashboardCard
							h={'100%'}
							p={5}
							_hover={{ transform: 'none' }}
							flex={1}
							position='relative'
						>
							<Heading pb={2}>
								<span style={{ textTransform: 'capitalize' }}>
									{approval.data?.[0].leaveType.toLowerCase()}
								</span>{' '}
								Leave applied by{' '}
								<Highlight query={['emphasize']}>
									{leave.data?.[0].user?.name ?? ''}
								</Highlight>
							</Heading>
							<Flex
								flexDir={'column'}
								gap={1}
							>
								<Text fontSize={'lg'}>
									Faculty:{' '}
									<Highlight query={['emphasize']}>
										{approval.data?.[0].user?.faculty
											?.name ?? ''}
									</Highlight>
								</Text>
								<Text fontSize={'lg'}>
									Department:{' '}
									<Highlight query={['emphasize']}>
										{approval.data?.[0].user?.department
											?.name ?? ''}
									</Highlight>
								</Text>
								<Text fontSize={'lg'}>
									Reason:{' '}
									<Highlight query={['emphasize']}>
										{approval.data?.[0].reason ?? ''}
									</Highlight>
								</Text>
								<Text fontSize={'lg'}>
									Dates:{' '}
									{new Date(
										approval.data?.[0].startDate
									).toLocaleDateString()}{' '}
									-{' '}
									{new Date(
										approval.data?.[0].endDate
									).toLocaleDateString()}
								</Text>
								<Text fontSize={'lg'}>
									Leave session:{' '}
									<span
										style={{ textTransform: 'capitalize' }}
									>
										{approval.data?.[0].leaveSession.toLowerCase()}
									</span>
								</Text>
							</Flex>

							<HStack
								position={'absolute'}
								bottom={5}
								right={5}
								alignSelf={'end'}
							>
								<Button onClick={()=>{
									mutation.mutate(ApprovalStatus.REJECTED)
								}} colorScheme={'red'}>Reject</Button>
								<Button
									onClick={()=>{
										mutation.mutate(ApprovalStatus.APPROVED)
									}}
									colorScheme={'green'}>Approve</Button>
							</HStack>
						</DashboardCard>
					</Flex>
					<Box p={10}>
						{/* @ts-ignore TODO: Add the correct typedef?*/}
						<LeaveHistory leave={leave} />
					</Box>
				</Grid>
			</Container>
		</>
	);
};

export default Approvals;
