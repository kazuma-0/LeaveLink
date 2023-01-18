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

import DashboardCard from '../../custom-components/DashboardCard';
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
import { useUser } from '../../contexts/UserProvider';
import { useQuery } from '@tanstack/react-query';
import client from '../../client';
import approvalQuery from '../../utils/data/approvalQuery';
import { ApprovalStatus } from '../../interfaces/ApprovalStatus';
import Loader from '../Loader';
import React from 'react';
import { useRouter } from 'next/router';
import PendingApprovals from '../dashboard/pending-approvals';

const HEAD_OF_DEPARTMENT = () => {
	return (
		<>
			<PendingApprovals />
		</>
	);
};

export default HEAD_OF_DEPARTMENT;
