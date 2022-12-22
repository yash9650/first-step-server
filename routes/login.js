import express from "express";
import { setUser } from "./utilityFx.js";

const route = express.Router();


route.get('/', (req, res) => {
    if(req.session.isAuth){
        res.redirect('/disease');
        return;
    }
    res.render('auth/login');
});

route.post('/login', setUser, (req, res) => {
    res.redirect('/disease');
});

route.get('/logout',(req,res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }else{
            console.log("destroyed");
        }
        res.redirect('/');
    });
})

export default route;