import express from 'express';
import Disease from '../models/disease-schema.js';


const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const result = await Disease.find();
        res.json(result);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});


route.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Disease.findById(id);
        res.json(data);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});

export default route;