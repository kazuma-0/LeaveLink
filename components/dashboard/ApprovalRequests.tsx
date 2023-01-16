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
import { useQuery } from '@tanstack/react-query';
import client from '../../client';
import { useUser } from '../../contexts/UserProvider';
import { useRouter } from 'next/router';

const ApprovalRequests: React.FC = () => {
	const user = useUser();
	const router = useRouter();
	const { data, isFetched } = useQuery({
		queryKey: ['approval-requests'],
		queryFn: async () => {
			const { data } = await client.get(
				`approval?user_id=${user.user_id}`
			);
			return data;
		},
	});
	return (
		<DashboardCard
			colSpan={4}
			rowSpan={5}
		>
			<Heading p={2}>Approval Requests</Heading>
			{isFetched && (
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
						{data.map((approval: any) => {
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

export default ApprovalRequests;
