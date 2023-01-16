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

import { useUser } from '../../contexts/UserProvider';
import { useQuery } from '@tanstack/react-query';
import client from '../../client';
import React, { useMemo } from 'react';
import {
	Center,
	ChakraProps,
	CircularProgress,
	CircularProgressLabel,
	GridItemProps,
	Heading,
	Link,
	Text,
} from '@chakra-ui/react';
import DashboardCard from '../../custom-components/DashboardCard';
const stages = {
	isHodApproved: 'Head of Department',
	isResidentDirectorApproved: 'Resident Director',
	isDeanApproved: 'Dean',
	isRegistrarApproved: 'Registrar',
	isStaffApproved: 'Staff',
};
const ApprovalProgress = (props: ChakraProps) => {
	const user = useUser();
	const approvals = useQuery({
		queryKey: ['approvals'],
		queryFn: async () => {
			const { data } = await client.get(
				`/approval?user_id=${user.user_id}&isApproved=false`
			);
			return data ?? { data: [] };
		},
	});
	const percentage = useMemo(() => {
		return (
			approvals.data?.length > 0 &&
			100 -
				(Object.keys(approvals.data[0]).filter(
					(x) => approvals.data[0][x] === 'NOT_CHECKED'
				).length /
					4) *
					100
		);
	}, [approvals.data]);
	const status =
		approvals.data?.length > 0 &&
		Object.keys(approvals.data[0]).filter(
			(x) => approvals.data[0][x] === 'PENDING'
		);
	return (
		<>
			<DashboardCard
				{...props}
				gridColumnStart={4}
				// rowSpan={2}
				// gridRowEnd={6}
			>
				<Heading
					textAlign={'center'}
					size={'md'}
					pb={2}
				>
					Approval progress
				</Heading>
				<Center flex={1}>
					{percentage ? (
						<>
							<CircularProgress
								px={2}
								value={percentage}
							>
								<CircularProgressLabel>
									{percentage}%
								</CircularProgressLabel>
							</CircularProgress>
							{/*@ts-ignore*/}
							<Text>{stages[status[0]]}</Text>
						</>
					) : (
						<Text>No approvals pending</Text>
					)}
				</Center>
				<Center>
					<Link
						href='#'
						fontSize={'xs'}
					>
						{approvals.data?.length > 0 && approvals?.data?.[0].id}
					</Link>
				</Center>
			</DashboardCard>
		</>
	);
};
export default ApprovalProgress;
