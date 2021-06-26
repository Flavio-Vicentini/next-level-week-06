import {Request,Response,NextFunction} from 'express';
import { verify } from 'jsonwebtoken'
import { appError } from '../utils/errorMessage';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated (request: Request,response: Response,next: NextFunction){
    const bearerToken = request.headers.authorization
    if (!bearerToken){
        throw new appError('Invalid token',401)
    }
    const token = bearerToken.split(' ')[1]

    try {
        const { sub } = verify(token,'2c3d92f5665e008a3b73f6e69c2b111a') as IPayload
        request.user_id = sub
        return next();
    } catch (error) {
        throw new appError('Invalid token',401)
    }
}