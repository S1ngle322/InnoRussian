import { injectable } from 'inversify';
import BaseRepository from './BaseRepository';
import { User } from '../models/User';
import UserEnum from '../types/enums/UserEnum';

@injectable()
class UserRepository extends BaseRepository<User> {
    constructor() {
        super(UserEnum.USER);
    }
}

export default UserRepository;