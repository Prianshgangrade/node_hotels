const express=require('express');
const router =express.Router();
const person=require('./../models/person');


router.get('/',async (req,res)=>{
    try{

        const data=await person.find()
        console.log('data fetched')
    res.status(200).json(data);
    }catch(err){
        res.status(500).json({error:'int server errror'});
    }
})

router.post('/',async(req,res)=>{
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
router.get('/:workty',async(req,res)=>{
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

router.put('/:id',async(req,res)=>{
    try{
        const personid=req.params.id;
    const updatedperson=req.body;
    const response= await person.findByIdAndUpdate(personid,updatedperson,{
        new : true,
        runValidators:true,
    })
    if(!response){
        return res.status(404).json({error:'person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
    }catch (err){
        console.log(err);
        res.status(500).json({error:'int server error'});
    }
});
router.delete('/:id',async(req,res)=>{
    try{
        const personid=req.params.id;
        const response= await person.findByIdAndDelete(personid);
        if(!response){
            return res.status(404).json({error:'person not found'});}
        
    console.log('data updated');
    res.status(200).json({message:'person deletd succesfully',response});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'int server error'});
    }
})


module.exports=router;