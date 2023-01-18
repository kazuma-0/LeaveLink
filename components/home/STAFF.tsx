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

import React, { useMemo } from 'react';
import DashboardCard from '../../custom-components/DashboardCard';
import {
	Center,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	Heading,
	Text,
	Link,
} from '@chakra-ui/react';
import LeaveHistory from '../LeaveHistory';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../../contexts/UserProvider';
import client from '../../client';
import { object } from 'prop-types';
import ApprovalProgress from '../dashboard/ApprovalProgress';
const stages = {
	isHodApproved: 'Head of Department',
	isResidentDirectorApproved: 'Resident Director',
	isDeanApproved: 'Dean',
	isRegistrarApproved: 'Registrar',
	isStaffApproved: 'Staff',
};
const STAFF: React.FC = () => {
	const user = useUser();
	const approvals = useQuery({
		queryKey: ['approval'],
		queryFn: async () => {
			const { data } = await client.get(
				`approval?user_id=${user.user_id}`
			);
			return data;
		},
	});
	console.log(approvals.data);
	return (
		<>
			{/*<DashboardCard>*/}
			{/*	<Heading fontSize={'xl'}>Casual Leaves available</Heading>*/}
			{/*</DashboardCard>*/}
			<DashboardCard
				rowSpan={3}
				colSpan={3}
			>
				<Heading size={'lg'}>Pending Approvals</Heading>
			</DashboardCard>
			<ApprovalProgress />
		</>
	);
};

export default STAFF;
