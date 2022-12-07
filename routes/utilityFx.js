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

function wrapAsync(fx){
    return function(req,res,next){
        fx(req,res,next).catch(err => next(err));
    }
}

export {wrapAsync, isAuth, setUser};