import { DTO } from './interface/DTO.interface';

export interface IUserDTO extends DTO {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	is_active: boolean;
	password_hash: string;
	token?: string;
	roles: string[];
}
