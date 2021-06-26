import express  from 'express';
import 'express-async-errors'
import {router} from './routes'
import './database'
import 'reflect-metadata';
import { errorMiddleware } from './middlewares/errorMiddelware';


const app = express()
app.use(express.json())

app.use(router)
app.use(errorMiddleware)

app.listen(3000, () => {
    console.log('Server is running!')
})