const express = require('express');
const mongoose = require('mongoose');
 const users = require('./routes/users.js');
/*const todos = require('./routes/todos.js'); */
require('dotenv').config();
const app = express();
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.body);
    next();
})
const PORT = process.env.PORT || 5000;
  app.use('/api/users/',users);
 /*app.use('/api/routes/todos',todos); */
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Connected to mongodb on port ${PORT}`);
    })
}).catch((error)=>{
    console.error(error.message);
})