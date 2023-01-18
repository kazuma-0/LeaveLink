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
	Button,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import DashboardCard from '../../custom-components/DashboardCard';
import React from 'react';
import { useUser } from '../../contexts/UserProvider';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import client from '../../client';
import approvalQuery from '../../utils/data/approvalQuery';
import { ApprovalStatus } from '../../interfaces/ApprovalStatus';

const PendingApprovals = () => {
	const user = useUser();
	const router = useRouter();
	const approvals = useQuery({
		queryKey: ['pending-approvals'],
		queryFn: async () => {
			const { data } = await client.get(
						// @ts-ignore
				`/approval?isRejected=false&${approvalQuery[user.role]}=${
					ApprovalStatus.PENDING
				}${user.departmentId !== null ? '&user[departmentId]=' + user.departmentId : '' }`
			);
			return data;
		},
	});
	return (
		<DashboardCard
			colSpan={3}
			rowSpan={3}
		>
			<Heading
				p={3}
				size={'lg'}
			>
				Pending Approvals
			</Heading>
			{approvals.isFetched && (
				<Table
					colorScheme='blue'
					size={'sm'}
				>
					<Thead>
						<Tr>
							<Th>User Id</Th>
							<Th>Name</Th>
							<Th>Leave</Th>
							<Th>Department</Th>
							{/*<Th>Branch</Th>*/}
							<Th>View</Th>
						</Tr>
					</Thead>
					<Tbody>
						{approvals?.data.map((approval: any) => {
							return (
								<Tr key={approval.id}>
									<Td>{approval.user.user_id}</Td>
									<Td>{approval.user.name}</Td>
									<Td>{approval.leaveType}</Td>
									<Td>
										{approval.user.department.name ?? '-'}
									</Td>
									<Td>
										<Button
											onClick={() =>
												router.push(
													`/dashboard/approvals/${approval.id}`
												)
											}
											colorScheme={'whatsapp'}
											size={'sm'}
										>
											View
										</Button>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			)}
		</DashboardCard>
	);
};

export default PendingApprovals;
