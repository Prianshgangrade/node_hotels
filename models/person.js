const mongoose=require('mongoose');
const personSchema =new mongoose.Schema({
    name:{
        type:String
        //this makes name field mandoatory in schema
    },
    age:{
        type:Number,
        required :"true" ,
    },
    work:{
        type:String,
        enmum:['chef','waiter','manager'],//only one of these fields will be accepted
        
    },
    mobile:{
        type:String
        
        
    },
    email:{
        type:String
        
        
    },
    salary:{
        type: Number
        
    }
    
});

//create person mode

const person=mongoose.model('person',personSchema);
module.exports = person;