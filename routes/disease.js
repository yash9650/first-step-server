import express from 'express';
import Disease from '../models/disease-schema.js';
import { wrapAsync, isAuth } from './utilityFx.js';


const route = express.Router();

route.get('/', isAuth, wrapAsync(async (req, res) => {
    const result = await Disease.find();
    res.render('disease', { result });
}));

route.get('/new', isAuth, (req, res) => {
    res.render('AddDisease');
});

route.post('/', isAuth, wrapAsync(async (req, res) => {
    const { dName, symptom, description, image, homeRemedies, type, healthEffect, cancerous } = req.body;
    const symptoms = symptom.split(',');
    const remedies = homeRemedies.split(/\r?\n/);
    const imageUrl = image.split(/\r?\n/);
    const isCancerous = cancerous === "Yes" ? true : false;

    const data = new Disease({ dName, symptoms, description, imageUrl, remedies, type, healthEffect, isCancerous });
    await data.save();
    res.redirect('/disease');
}));

route.get('/:id/edit', isAuth, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { dName, symptoms, description, imageUrl, remedies, type, healthEffect, isCancerous } = await Disease.findById(id);
    res.render('EditDisease',
        { id, dName, symptoms, description, imageUrl, remedies, type, healthEffect, isCancerous });
}));

route.put('/:id', isAuth, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { dName, symptom, description, image, homeRemedies, type, healthEffect, cancerous } = req.body;
    const symptoms = symptom.split(',');
    const remedies = homeRemedies.split(/\r?\n/);
    const imageUrl = image.split(/\r?\n/);
    const isCancerous = cancerous === "Yes" ? true : false;

    await Disease.findByIdAndUpdate(id, {
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
}));

route.delete('/:id', isAuth, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Disease.findByIdAndDelete(id);
    res.redirect('/disease');
}));


export default route;