import { chakra, GridItem } from '@chakra-ui/react';

const DashboardCard = chakra(GridItem, {
	baseStyle: {
		display: 'flex',
		flexDir: 'column',
		backgroundColor: 'white',
		minHeight: '120px',
		rounded: 'lg',
		p: '2',
		shadow: 'sm',
		outline: '1px solid #4e8c5a40',
		transition: 'all 300ms',
		// _hover: {
		// 	transform: 'scale(1.01)',
		// },
		overflowY: 'auto',
	},
});

export default DashboardCard;
