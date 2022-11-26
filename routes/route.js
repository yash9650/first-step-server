import  express, { query } from "express";
import disease from "../models/disease-schema.js";


const route = express.Router();


route.get('/',(req,res)=>{res.render('disease')});
route.post('/add-disease', (req,res)=>{
    let {dName,symptom, description, imageUrl,homeRemedies, type, healthEffect,cancerous}= req.body;
    const symptoms = symptom.split(',');
    const remedies  = homeRemedies.split(/\r?\n/);
    const isCancerous = cancerous === 'yes'? true : false;
    try{
        const data = new disease({dName,symptoms, description, imageUrl, remedies, type, healthEffect, isCancerous});
        data.save();
        res.redirect('/');
    }catch(err){
        console.log(err);
    }
});

route.get('/data',(req,res)=>{
    
    disease.find().then((result)=> {
        res.json(result);
    }).catch(err => console.log(err) );
});

route.get('/detail',async(req,res)=>{
    const {id,type} = req.query;
    const data = await disease.findById(id).then(result => result);
    res.json(data);
});

export default route;