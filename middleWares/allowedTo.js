module.exports = (...roles) => {
    return(req,res,next) => {
        if(!roles.includes(req.decodedToken.role)){
            return res.status(401).json({message: 'Unauthorized'});
        }
       next();
    }
}