function isAuth(req,res,next) {
    if(req.session.isAuth){
        return next();
    }
    res.redirect('/');
}

function setUser(req,res,next){
    const {username , password} = req.body;
    if(username.toUpperCase().trim() === process.env.USERNAME 
    && password.toUpperCase().trim() === process.env.PASS){
        req.session.isAuth = true;
        req.session.save(err => {
            if(err){
                res.redirect('/');
                console.log(err);
            }else{
                return next();
            }
        })
    }else{
        res.redirect('/');
    }
}

function wrapAsync(fx){
    return function(req,res,next){
        fx(req,res,next).catch(err => next(err));
    }
}

export {wrapAsync, isAuth, setUser};