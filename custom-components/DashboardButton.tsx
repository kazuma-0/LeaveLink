import { Box, chakra, Flex } from '@chakra-ui/react';
import Link from 'next/link';

const DashBoardButton = chakra(Flex, {
  baseStyle: {
    cursor: 'pointer',
    p: 3,
    bgColor: '',
    color: 'white',
    rounded: 'lg',
    userSelect: 'none',
    transition: 'all 300ms',
    _hover: {
      bgColor: '#ffffff20',
      shadow: '0 0 10px #00000010',
    },
  },
});
export default DashBoardButton;
