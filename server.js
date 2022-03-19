const express = require('express');
const mongoose = require('mongoose');    
const items=require('./routes/api/items')         
// Initialiser "express" dans une variable nommée "app"
const app = express();
// BodyParser Middleware
app.use(express.json());
// DB config
const db = require('./config/keys').mongoURI ;
// connect to mongoDB
mongoose
           .connect(db)
           .then( ()=> console.log('MongoDB Connected ...'))
           .catch( err=> console.log(err) ) ;
//use routes
app.use('/api/items', items);

const port = process.env.PORT || 4000 ;
app.listen(port, ()=> console.log(`Server started on port ${port}`) );
