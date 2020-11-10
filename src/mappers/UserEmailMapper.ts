import Mapper from '../types/interfaces/Mapper';
import { User } from '../models/User';
import UserDTO from '../types/dtos/UserDTO';
import { injectable } from 'inversify';


@injectable()
class UserEmailMapper implements Mapper<User> {
    toDomain(dto: UserDTO): User {
        const user = new User();
        user.username = dto.username;
        user.type = dto.type;
        user.password = dto.password;
        user.email = dto.email;
        return user;
    }
    toDTO(domain: User): UserDTO {
        const userDto = new UserDTO();
        userDto._id = domain._id;
        userDto.username = domain.username;
        userDto.type = domain.type;
        userDto.email = domain.email;
        return userDto;
    }
}

export default UserEmailMapper;
