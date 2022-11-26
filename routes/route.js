import  express from "express";
import disease from "../models/disease-schema.js";


const route = express.Router();


route.get('/',(req,res)=>{res.render('disease')});
route.post('/add-disease', async(req,res)=>{
    const {dName,symptom, description, image,homeRemedies, type, healthEffect,cancerous}= req.body;
    const symptoms = symptom.split(',');
    const remedies  = homeRemedies.split(/\r?\n/);
    const imageUrl = image.split(/\r?\n/);
    const isCancerous = cancerous === "Yes"? true : false;

    try{
        const data = new disease({dName,symptoms, description, imageUrl, remedies, type, healthEffect, isCancerous});
        await data.save();
        res.redirect('/');
    }catch(error){
        res.render('error',{error});
    }
});


route.get('/data',async(req,res)=>{
    try{
        const result = await disease.find();
        res.json(result);
    }catch(error){
        res.render('error',{error});
    }
});

route.get('/:type/:id',async(req,res)=>{
    const {type,id} = req.params;
    try{
        const data = await disease.findById(id);
        res.json(data);
    }catch(error){
        res.render('error',{error});
    }
});

route.use((req,res)=>{
    res.render('notfound');
})

export default route;