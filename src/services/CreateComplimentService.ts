import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UserRepositories } from "../repositories/UserRepositories"
import { appError } from "../utils/errorMessage"


interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute ({tag_id,user_sender,user_receiver,message}:IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const userRepositories = getCustomRepository(UserRepositories)
        
        if (user_sender === user_receiver) {
            throw new appError ('User receiver must be diferent.')
        }
        const userReceiverExists = await userRepositories.findOne(user_receiver)
        if(!userReceiverExists){
            throw new appError ('User receiver does not exists.')
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        })

        await complimentsRepositories.save(compliment)
        return compliment;
    }
}
export {CreateComplimentService}