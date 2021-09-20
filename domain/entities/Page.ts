import { IPageDTO } from './../dtos/IPageDTO';
import { IEntity } from './interface/IEntity';

export class Page implements IEntity {
	id?: string;
	src: string;
	name: string;
	description: string;
	metaTitle: string;
	metaDescription: string;
	metaKeyword: string;
	canonicalPath: string;

	public constructor(init?: Partial<Page>) {
		Object.assign(this, init);
	}

	public construct(pageDto: IPageDTO): this {
		this.id = pageDto.id;
		this.src = pageDto.src;
		this.name = pageDto.name;
		this.description = pageDto.description;
		this.metaTitle = pageDto.metaTitle;
		this.metaDescription = pageDto.metaDescription;
		this.metaKeyword = pageDto.metaKeyword;
		this.canonicalPath = pageDto.canonicalPath;
		return this;
	}
}
