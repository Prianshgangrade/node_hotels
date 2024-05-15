const express = require('express')
const app = express();
const db =require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());//we are just using json data this time thats why were are writing json data


const person=require('./models/person');
const menu=require('./models/menu');

 app.get('/', function (req, res) {
  res.send('Hello World priansh  is here')
})

app.post('/person',async(req,res)=>{
    try{
        const data=req.body            //assuming the request body contains the person data
        
    //create a new perosn document using rhe mongoose model
    const newPerson=new person(data);
//     newPerson.name=data.name; simply write data insde new perons(data)
//     newPerson.age=data.age;
//     newPerson.salary=data.salary;
//     newPerson.work=data.work;
//     newPerson.email=data.email;
//     newPerson.mobile=data.mobile;
    const response = await newPerson.save();
    console.log('data saved')
    res.status(200).json(response);
    }catch(err){
     console.log(err);
    res.status(500).json({error:'int server errror'});

    }
})
app.get('/person',async (req,res)=>{
    try{

        const data=await person.find()
        console.log('data fetched')
    res.status(200).json(data);
    }catch(err){
        res.status(500).json({error:'int server errror'});
    }
})

//pist method for menu

app.post('/menu',async(req,res)=>{
    try{
        const data=req.body
        if (!data.name || !data.price || !data.taste) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newmenu=new menu(data);
        const response= await newmenu.save();
        console.log('menu saved');
        res.status(200).json(response);
        }catch(err){
            console.log(err);
            res.status(500).json({error:'int server error'});
        }
})
app.get('/menu',async(req,res)=>{
    try{
        const data=await menu.find();
        console.log('menu fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'int server error'});
    }
})

app.get('/person/:workty',async(req,res)=>{
    try{
    const workty=req.params.workty;
    if(workty=='chef'||workty=='manager'||workty=='waiter'){
        const response=await person.find({work:workty});
        console.log('response fetched');
        res.status(200).json(response);
    }else{
        res.status(404).json({error:"Invalid work type"});
    }
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'});
}
})
app.listen(3000,()=>{
    console.log('listining on 3000');

})//3000 is port
