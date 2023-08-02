import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;
import {notFound,errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'



connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());
app.use('/api/users',userRoutes);
app.get('/', (req, res) => {
    res.sendFile('Server');
});

app.use(notFound);
app.use(errorHandler);
app.listen(port,() =>console.log('listening on port ' + port));