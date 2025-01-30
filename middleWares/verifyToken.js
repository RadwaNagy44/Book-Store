const jwt = require('jsonwebtoken');
const {ERROR} = require('../utils/httpStatusText');
const verifyToken = (req,res,next) => {
     const authHeader = req.headers['Authorization'] || req.headers['authorization'];
     if(!authHeader){
        return res.status(401).json({status: ERROR, message: 'Token Is Required'});
     }
     const token = authHeader.split(' ')[1];
     try{
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.decodedToken = decodedToken;
        next();
     }catch(err){
        return res.status(401).json({status: ERROR, message: 'Invalid Token'});
     }
}
module.exports = verifyToken;