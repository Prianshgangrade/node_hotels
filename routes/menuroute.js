const express=require('express');
const router=express.Router();
const menu=require('./../models/menu');

router.post('/',async(req,res)=>{
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
router.get('/',async(req,res)=>{
    try{
        const data=await menu.find();
        console.log('menu fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'int server error'});
    }
})
module.exports=router;