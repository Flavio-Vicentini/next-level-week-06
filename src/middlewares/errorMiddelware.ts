import {Request,Response,NextFunction} from 'express';
import {appError} from '../utils/errorMessage'

export function errorMiddleware (err: Error, request: Request, response: Response,next: NextFunction) {
    if (err instanceof appError) {
        return response.status(err.statusCode).json({
            error: err.message
        })
    }
    return response.status(500).json({
        message: 'Internal Server Error'
    })
}