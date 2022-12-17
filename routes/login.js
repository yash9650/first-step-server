import express from "express";
import { isAuth, setUser } from "./utilityFx.js";

const route = express.Router();


route.get('/', (req, res) => {
    res.render('auth/login');
});

route.post('/login', setUser, isAuth, (req, res) => {
    res.redirect('/disease');
});

export default route;