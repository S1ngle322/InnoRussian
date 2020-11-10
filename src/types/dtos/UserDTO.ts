import DTO from '../classes/BaseDTO';
import UserEnum from '../../types/enums/UserEnum';

class ClientDTO extends DTO {
    type: UserEnum;
    email: string;
    username: string;
    password: string;
    isVerified: boolean;
}

export default ClientDTO;
