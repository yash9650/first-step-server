import express from "express";
import { setUser } from "./utilityFx.js";

const route = express.Router();


route.get('/', (req, res) => {
    req.session.destroy();
    res.render('auth/login');
});

route.post('/login', setUser, (req, res) => {
    res.redirect('/disease');
});

export default route;