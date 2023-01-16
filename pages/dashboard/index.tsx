import { NextPage } from 'next';
import { useUser } from '../../contexts/UserProvider';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { Role } from '../../utils/Roles';
import dynamic from 'next/dynamic';
import {
	IconHome2,
	IconReport,
	IconReportAnalytics,
	IconTable,
	IconUserExclamation,
} from '@tabler/icons';
import DashboardTopNav from '../../components/DashboardTopNav';
import DashboardLink from '../../custom-components/DashboardLink';
import DashboardCard from '../../custom-components/DashboardCard';
import navigationItems from '../../utils/data/navigationItems';

const dashboardComponents = [
	{
		role: [
			Role.REGISTRAR,
			Role.HEAD_OF_DEPARTMENT,
			Role.RESIDENT_DIRECTOR,
			Role.DEAN,
		],
		component: dynamic(
			() =>
				import('./../../components/PendingApprovals').then(
					(mod) => mod.default
				),
			{
				ssr: false,
			}
		),
		name: 'approval',
		label: 'Pending Approval',
		icon: <IconTable />,
	},
];
const Dashboard: NextPage = (props) => {
	const router = useRouter();
	const user = useUser();
	const [ActiveComponent, setActiveComponent] = useState<any>();
	const [navigationList, setNavigationList] = useState<any[]>([]);
	const setHomeComponent = useCallback(() => {
		setActiveComponent(
			dynamic(() => import(`../../components/home/${user?.role}`), {
				ssr: false,
			})
		);
	}, [user]);
	// lazy loading the home component.
	useEffect(() => {
		// Set the active component based on the user's role
		if (user?.role) {
			setHomeComponent();

			// Set the navigation list based on the user's role
			setNavigationList(
				navigationItems.filter((x) => {
					console.log(user.role);
					// return x;
					return x.roles.includes(user?.role);
				})
			);
			// console.log(navigationItems);
			console.log(navigationList);
		}
	}, [user]);

	return (
		<>
			<DashboardTopNav />
			<Flex h={'calc(100vh - 64px)'}>
				<Box
					w={'60'}
					h={'full'}
					p={4}
				>
					<Box
						shadow={'sm'}
						h={'full'}
						w={'full'}
						bgColor={'#ffffff'}
						rounded={'lg'}
						py={2}
						userSelect={'none'}
					>
						<DashboardLink
							onClick={() => {
								setHomeComponent();
							}}
						>
							<IconHome2 /> <Text pl={3}>Home</Text>
						</DashboardLink>
						{navigationList.map((item, index) => {
							return (
								<DashboardLink
									key={index}
									onClick={() => {
										setActiveComponent(item.component);
									}}
								>
									{item.icon} <Text pl={3}>{item.label}</Text>
								</DashboardLink>
							);
						})}
					</Box>
				</Box>
				<Grid
					pt={5}
					gridTemplateColumns={'repeat(4, 1fr)'}
					flexWrap={'wrap'}
					gap={'5'}
					gridTemplateRows={'repeat(5, 1fr)'}
					h={'full'}
					w={'calc(100vw - 15rem)'}
					p={4}
				>
					{ActiveComponent}
				</Grid>
			</Flex>
		</>
	);
};
export default Dashboard;
