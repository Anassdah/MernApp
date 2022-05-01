import express from 'express';
import mongoose from 'mongoose';  
import { MongoURI } from './config/keys';  
const items=require('./routes/api/items') 
const cors=require('cors')

const app:any = express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());


mongoose
           .connect(MongoURI)
           .then( ()=> console.log('MongoDB Connected ...'))
           .catch( (err: String)=> console.log(err) ) ;

app.use('/api/items', items);

const port:any= process.env.PORT || 4000 ;
app.listen(port, ()=> console.log(`Server started on port ${port}`) );