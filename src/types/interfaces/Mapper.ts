import DTO from '../classes/BaseDTO';
import { BaseModel } from '../classes/BaseModel';

interface Mapper<BaseModel> {
    toDomain(dto: DTO): BaseModel;
    toDTO(domain: BaseModel): DTO;
}

export default Mapper;
