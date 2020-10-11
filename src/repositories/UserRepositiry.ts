import { injectable } from 'inversify';
import BaseRepository from './BaseRepository';
import { User } from '../models/User';

@injectable()
class UserRepository extends BaseRepository<User> {
    constructor() {
        super('User');
    }
}

export default UserRepository;