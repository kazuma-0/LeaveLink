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
	IconBuildingFactory2,
	IconForms,
	IconReportAnalytics,
	IconUserCheck,
	IconUserExclamation, IconUserPlus,
} from '@tabler/icons';
import dynamic from 'next/dynamic';
import { ComponentType, ReactElement } from 'react';
import { Role } from '../Roles';

interface INavigationItem {
	label: string;
	icon: ReactElement;
	component: ComponentType<{}>;
	roles: Role[];
}
const navigationItems: INavigationItem[] = [
	{
		label: 'Absences',
		icon: <IconUserExclamation />,
		roles: [Role.REGISTRAR],
		component: dynamic(
			() =>
				import('../../components/PendingApprovals').then(
					(mod) => mod.default
				),
			{ ssr: false }
		),
	},
	{
		label: 'Reports',
		icon: <IconReportAnalytics />,
		roles: [
			Role.REGISTRAR,
			Role.DEAN,
			Role.HEAD_OF_DEPARTMENT,
			Role.RESIDENT_DIRECTOR,
		],
		component: dynamic(
			() =>
				import('../../components/dashboard/reports').then(
					(mod) => mod.default
				),
			{ ssr: false }
		),
	},
	{
		label: 'Apply for leave',
		icon: <IconForms />,
		roles: [
			Role.DEAN,
			Role.HEAD_OF_DEPARTMENT,
			Role.RESIDENT_DIRECTOR,
			Role.STAFF,
		],
		component: dynamic(
			() =>
				import('../../components/dashboard/apply-leave').then(
					(mod) => mod.default
				),
			{ ssr: false }
		),
	},
	{
		label: 'Approval Requests',
		icon: <IconUserCheck />,
		roles: [
			Role.DEAN,
			Role.HEAD_OF_DEPARTMENT,
			Role.RESIDENT_DIRECTOR,
			Role.STAFF,
		],
		component: dynamic(
			() =>
				import('../../components/dashboard/ApprovalRequests').then(
					(mod) => mod.default
				),
			{ ssr: false }
		),
	},
	{
		label: 'Add Faculty',
		icon: <IconBuildingFactory2 />,
		roles: [
			Role.EDITOR,
			Role.REGISTRAR,
		],
		component: dynamic(
			() =>
				import('../../components/dashboard/admin/add-faculty').then(
					(mod) => mod.default
				),
			{ ssr: false }
		),
	},{
		label: 'Add Department',
		icon: <IconBuildingFactory2 />,
		roles: [
			Role.EDITOR,
			Role.REGISTRAR,
		],
		component: dynamic(
			() =>
				import('../../components/dashboard/admin/add-department').then(
					(mod) => mod.default
				),
			{ ssr: false }
		),
	},{
		label: 'Add Branch',
		icon: <IconBuildingFactory2 />,
		roles: [
			Role.EDITOR,
			Role.REGISTRAR,
		],
		component: dynamic(
			() =>
				import('../../components/dashboard/admin/add-branch').then(
					(mod) => mod.default
				),
			{ ssr: false }
		),
	},{
		label: 'Add Staff',
		icon: <IconUserPlus />,
		roles: [
			Role.EDITOR,
			Role.REGISTRAR,
		],
		component: dynamic(
			() =>
				import('../../components/dashboard/admin/add-staff').then(
					(mod) => mod.default
				),
			{ ssr: false }
		),
	},
];

export default navigationItems;
