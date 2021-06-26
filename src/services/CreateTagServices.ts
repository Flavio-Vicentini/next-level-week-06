import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import {appError} from '../utils/errorMessage'

class CreateTagService {
    async execute (name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories)

        if (!name) {
            throw new appError ('Incorrect name.')
        }

        const tagAlreadyExists = await tagsRepositories.findOne({name})
        if (tagAlreadyExists){
            throw new appError ('Tag already exists.')
        }

        const tag = tagsRepositories.create({name})
        await tagsRepositories.save(tag)

        return tag;

    }
}
export {CreateTagService}