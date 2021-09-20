import { DTO } from './interface/DTO.interface';

export interface IPageDTO extends DTO {
	id?: string;
	src: string;
	name: string;
	description: string;
	metaTitle: string;
	metaDescription: string;
	metaKeyword: string;
	canonicalPath: string;
}
