import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { appError } from "../utils/errorMessage"
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

interface IAuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute ({email, password}:IAuthRequest) {
        const userRepositories = getCustomRepository(UserRepositories)
        const user = await userRepositories.findOne({email})

        if(!user) {
            throw new appError ('Email/Password incorrect.',401)
        }

        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new appError ('Email/Password incorrect.',401)
        }

        const token = sign({
            email: user.email,
        },
        '2c3d92f5665e008a3b73f6e69c2b111a',
        {
            subject: user.id,
            expiresIn: '1d'
        }     
        )

        return token;
    }
}
export {AuthUserService}