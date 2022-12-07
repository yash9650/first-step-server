import express from "express";
import disease from "../models/disease-schema.js";

const route = express.Router();

function isAuth(req,res,next) {
    const {user,pass} = req.session;
    if(user === process.env.USERNAME && pass === process.env.PASS){
        return next();
    }
    res.redirect('/');
}

function setUser(req,res,next){
    const {username , password} = req.body;
    req.session.user = username.toUpperCase().trim();
    req.session.pass = password.toUpperCase().trim();
    return next();
}

route.get('/',(req,res) => {
    res.render('auth/login');
});

route.post('/login',setUser,isAuth,(req,res)=>{
    res.redirect('/disease');
});

route.get('/disease',isAuth, async (req, res) => {
    try {
        const result = await disease.find();
        res.render('disease', { result });
    } catch (error) {
        res.render('error', { error });
    }
});

route.get('/disease/new', isAuth,(req, res) => { res.render('AddDisease') });

route.post('/disease', isAuth,async (req, res) => {
    const { dName, symptom, description, image, homeRemedies, type, healthEffect, cancerous } = req.body;
    const symptoms = symptom.split(',');
    const remedies = homeRemedies.split(/\r?\n/);
    const imageUrl = image.split(/\r?\n/);
    const isCancerous = cancerous === "Yes" ? true : false;

    try {
        const data = new disease({ dName, symptoms, description, imageUrl, remedies, type, healthEffect, isCancerous });
        await data.save();
        res.redirect('/disease');
    } catch (error) {
        res.render('error', { error });
    }
});

route.get('/disease/:id/edit', isAuth,async (req, res) => {
    const { id } = req.params;
    try {
        const { dName, symptoms, description, imageUrl, remedies, type, healthEffect, isCancerous } = await disease.findById(id);
        res.render('EditDisease',
            { id, dName, symptoms, description, imageUrl, remedies, type, healthEffect, isCancerous });
    } catch (error) {
        res.render('error', { error });
    }
})

route.put('/disease/:id', isAuth,async (req, res) => {
    const { id } = req.params;
    const { dName, symptom, description, image, homeRemedies, type, healthEffect, cancerous } = req.body;
    const symptoms = symptom.split(',');
    const remedies = homeRemedies.split(/\r?\n/);
    const imageUrl = image.split(/\r?\n/);
    const isCancerous = cancerous === "Yes" ? true : false;

    try {
        await disease.findByIdAndUpdate(id, {
            dName,
            symptoms,
            description,
            imageUrl,
            remedies,
            type,
            healthEffect,
            isCancerous
        });
        res.redirect('/disease');
    } catch (error) {
        res.render('error', { error });
    }
});

route.delete('/disease/:id', isAuth,async (req, res) => {
    const { id } = req.params;
    try{
        await disease.findByIdAndDelete(id);
        res.redirect('/disease');
    }catch(error){
        res.render('error',{error});
    }
});


// ------------------- For FrontEnd ---------------------------->
route.get('/disease/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await disease.findById(id);
        res.json(data);
    } catch (error) {
        res.render('error', { error });
    }
});

route.get('/data', async (req, res) => {
    try {
        const result = await disease.find();
        res.json(result);
    } catch (error) {
        res.render('error', { error });
    }
});

route.get('*', (req, res) => {
    res.render('notfound');
})

export default route;