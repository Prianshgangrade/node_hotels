const mongoose = require('mongoose');


//define the MOngoDb  connection URL
const mongoURL = 'mongodb://localhost:27017/yoyo'  // Replace 'mydatabse' with your Databse name

//Set up MongoDb connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

 
//Get the default connection
//Mongoose maintains a defualt connection object representing the MOngoDB connection.

const db=mongoose.connection;


//define event listeners for database connection

db.on('connected',()=>{
    console.log('Mongodb connected ');
});
db.on('error',(err)=>{
    console.log('MongoDb connection error:',err);
})
db.on('disconnected',()=>{
    console.log('MongoDb disconnected');
});

//export the databse connection
module.exports =db;
