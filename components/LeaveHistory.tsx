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
	Heading,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import React from 'react';

export interface LeaveHistoryProps {
	leave: {
		data: [
			{
				casualLeaves: number;
				permissionLeaves: number;
				onDutyLeaves: number;
				compensationLeaves: number;
			}
		];
	};
}
const LeaveHistory: React.FC<LeaveHistoryProps> = ({ leave: { data } }) => {
	return (
		<>
			<Heading pb={5}>Leave History</Heading>
			<TableContainer>
				<Table size={'lg'}>
					{/*<TableCaption>Leave history</TableCaption>*/}
					<Thead>
						<Tr>
							<Th>Type of Leave</Th>
							<Th>Leave&apos;s taken this month</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>Casual</Td>
							<Td>{data?.[0]?.casualLeaves ?? 0}</Td>
						</Tr>
						<Tr>
							<Td>Permission</Td>
							<Td>{data?.[0]?.permissionLeaves ?? 0}</Td>
						</Tr>
						<Tr>
							<Td>On Duty</Td>
							<Td>{data?.[0]?.onDutyLeaves ?? 0}</Td>
						</Tr>
						<Tr>
							<Td>Compensation</Td>
							<Td>{data?.[0]?.compensationLeaves ?? 0}</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export default LeaveHistory;
