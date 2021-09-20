import { IUserDTO } from '../dtos/IUserDTO';
import { IEntity } from './interface/IEntity';

export class User implements IEntity {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	password_hash: string;
	token?: string;
	roles: string[];
	is_active: boolean;

	public construct(userDto: IUserDTO): this {
		this.id = userDto.id;
		this.email = userDto.email;
		this.first_name = userDto.first_name;
		this.last_name = userDto.last_name;
		this.password_hash = userDto.password_hash;
		this.token = userDto.token;
		this.roles = userDto.roles;
		this.is_active = userDto.is_active;
		return this;
	}
}
