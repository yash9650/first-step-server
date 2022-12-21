function isAuth(req,res,next) {
    // const {user,pass} = req.session;
    // if(user === process.env.USERNAME && pass === process.env.PASS){
    //     res.is
    //     return next();
    // }
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
        return next();
    }
    // req.session.user = username.toUpperCase().trim();
    // req.session.pass = password.toUpperCase().trim();
    res.redirect('/');
}

function wrapAsync(fx){
    return function(req,res,next){
        fx(req,res,next).catch(err => next(err));
    }
}

export {wrapAsync, isAuth, setUser};