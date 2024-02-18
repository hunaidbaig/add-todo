import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose';
import { Route } from './routes/route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const URL = process.env.DATABASE_URL || null;


app.use(cors());
app.use(express.json());


app.use('/test', (req, res)=>{
    return res.status(200).json({
        message : 'server is running!'
    });
});


app.use('/api', Route);


app.listen(PORT, async ()=>{
    console.log(`Server is running on PORT: http://localhost:${PORT}`);

    await mongoose.connect(URL).then(()=>{
        console.log(`Database is connected!!`);
    });
    
});


