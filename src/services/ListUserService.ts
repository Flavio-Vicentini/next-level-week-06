import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import {classToPlain} from 'class-transformer'

class ListUserService {
    async execute(){
        const userRepositories = getCustomRepository(UserRepositories)
        const users = await userRepositories.find({
            where: { admin:false}
        })
        
        return classToPlain(users);
    }
}
export {ListUserService}