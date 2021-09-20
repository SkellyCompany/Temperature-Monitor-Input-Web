import { DTO } from './../../dtos/interface/DTO.interface';

export interface IEntity {
    construct(dto: DTO): this
}
