import { IUser } from './IUser';
export default interface IFullUser extends IUser {
	department: {
		id: number;
		createdAt: Date;
		name: string;
		facultyId: string;
	};
	branch: {
		id: number;
		createdAt: Date;
		name: string;
		departmentId: number;
	};
}
