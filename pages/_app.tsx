import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserProvider from '../contexts/UserProvider';
import dynamic from 'next/dynamic';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient({});
	const ClientUserProvider = dynamic(
		() => import('../contexts/UserProvider').then((mod) => mod.default),
		{ ssr: false }
	);
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>
					<ClientUserProvider>
						<Component {...pageProps} />
						<ReactQueryDevtools />
					</ClientUserProvider>
				</ChakraProvider>
			</QueryClientProvider>
		</>
	);
}
