import {inject, injectable, named} from "inversify";
import Types from "../types/enums/DITypes";
import Tags from "../types/enums/DITags";
import UserRepository from "../repositories/UserRepositiry";
import VerificationTokenRepository from "../repositories/VerificationTokenRepository";
import EmailService from "./EmailService";
import UserDTO from "../types/dtos/UserDTO";
import {User} from "../models/User";
import UserEmailMapper from "../mappers/UserEmailMapper";
import { VerificationToken } from "../models/VerificationToken";
import ValidationError from "../types/exceptions/ValidationError";

@injectable()
class UserService {
    @inject(Types.REPOSITORY)
    @named(Tags.USER)
    private userRepository: UserRepository;

    @inject(Types.REPOSITORY)
    @named(Tags.VERIFICATION_TOKEN)
    private verificationTokenRepository: VerificationTokenRepository;

    @inject(Types.SERVICE)
    @named(Tags.EMAIL)
    private emailService: EmailService;

    @inject(Types.MAPPER)
    @named(Tags.EMAIL)
    private userEmailMapper: UserEmailMapper;

    public async registerClient(
        client: UserDTO,
        host: string
    ): Promise<UserDTO> {
        const userDomain = this.userEmailMapper.toDomain(
            client
        ) as User;
        const clientDto = this.userEmailMapper.toDTO(
            await this.userRepository.create(userDomain)
        );
        await this.emailService.sendVerificationEmail(clientDto, host);
        return clientDto;
    }

    public async verifyClient(tokenValue: string): Promise<void> {
        const token  = await this.verificationTokenRepository.findOne({
            value: tokenValue
        } as VerificationToken);
        const user = await this.userRepository.findById(token.user);
        if (user.isVerified) {
            throw new ValidationError(
                'This client has already been activated.'
            );
        }
        user.isVerified = true;
        await this.userRepository.update(user._id, user);
    }

}

export default UserService;