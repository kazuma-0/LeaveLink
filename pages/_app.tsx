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
