import { ListUserService } from "../services/ListUserService"
import {Request,Response} from 'express'

class ListUsersController {
    async handle(request: Request, response: Response){
        const listUserService = new ListUserService()
        const users = await listUserService.execute()
        
        return response.json(users)
    }
}
export {ListUsersController}