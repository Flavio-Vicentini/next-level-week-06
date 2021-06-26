import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import {appError} from '../utils/errorMessage'
import {hash} from "bcryptjs"
import {classToPlain} from 'class-transformer'

interface IUserRequest{
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({name,email,admin=false,password }:IUserRequest) {
        const userRepository = getCustomRepository(UserRepositories)

        if (!email){
            throw new appError ('Email incorrect.')
        }

        const userAlreadyExists = await userRepository.findOne({email})
        if (userAlreadyExists) {
            throw new appError('User already exists.')
        }

        const passwordHashed = await hash(password,8)
        const user = userRepository.create({
            name,
            email,
            admin,
            password:passwordHashed
        })

        await userRepository.save(user)
        return classToPlain(user);
    }

}
export { CreateUserService}