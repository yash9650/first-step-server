import express from 'express';
import Query from '../models/query-schema.js';
import { wrapAsync } from './utilityFx.js';

const route = express.Router();

route.post('/',wrapAsync(async(req,res) => {
    const {name, email, subject, feedback} = req.body;

    const query = new Query({
        name,
        email,
        subject,
        feedback
    });
    await query.save();
    res.status(200).json({message: "Successfully sent query"});
}));

export default route;