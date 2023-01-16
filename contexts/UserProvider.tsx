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
