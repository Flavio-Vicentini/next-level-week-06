import {Request,Response,NextFunction} from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';
import {appError} from '../utils/errorMessage'

export async function ensureAdmin (request: Request, response: Response,next: NextFunction) {
    const {user_id} = request
    
    const userRepositories = getCustomRepository(UserRepositories)
    const { admin } = await userRepositories.findOne(user_id)
    
    if(!admin){
        throw new appError ('User is not an admin',401)
    }
    next();
}