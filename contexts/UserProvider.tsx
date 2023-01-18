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

import React, { useContext, useEffect, useState } from 'react';
import { IUser } from '../interfaces/IUser';
import { useRouter } from 'next/router';
import client from '../client';
import { useMutation, useQuery } from '@tanstack/react-query';

// @ts-ignore
const UserContext = React.createContext<IUser>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	let temp = localStorage.getItem('user');
	if (temp) {
		temp = JSON.parse(temp);
	} else {
		temp = null;
	}
	// @ts-ignore
	const [user, setUser] = useState<IUser | null>(temp);
	const router = useRouter();
	let access_token = localStorage.getItem('token');
	if (!access_token && router.pathname.includes('dashboard')) {
		router.push('/');
	}
	return (
		<>
			{/*@ts-ignore*/}
			<UserContext.Provider value={user}>{children}</UserContext.Provider>
		</>
	);
};
export const useUser = () => {
	return useContext(UserContext)
};
export default UserProvider;
