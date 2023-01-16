import { Role } from '../utils/Roles';

export interface IUser {
	name: string;
	user_id: string;
	date_of_birth: string;
	branchId: number;
	departmentId: number;
	role: Role;
}
