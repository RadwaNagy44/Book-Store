const asyncWrapper = require('../middleWares/asyncWrapper');
const User = require('../models/userModel');
const {SUCCESS,FAIL} = require('../utils/httpStatusText');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/generateJWT');


const getAllUsers = asyncWrapper( 
    async (req, res) => {
        const query = req.query;
        const limit = query.limit ? parseInt(query.limit) : 10;
        const page = query.page ? parseInt(query.page) : 1;
        const skip = (page - 1) * limit;
        const users = await User.find({},{"__v": false,"password": false}).limit(limit).skip(skip);
        res.json({status: SUCCESS, data: {users}});
});

const register = asyncWrapper(
    async(req,res) => {
        const {firstName,lastName,email,password,role} = req.body;
        const userExists = await User.findOne({email});
        if(userExists) return res.status(400).json({status: FAIL, message: 'User already exists'});
        //Password Hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({firstName,lastName,email,password:hashedPassword,role});
        //Generate JWT token
        const token = await generateJWT({email: newUser.email, id: newUser._id, role: newUser.role});
        newUser.token = token;
        await newUser.save(); 
        res.status(201).json({status: SUCCESS, data: {user: newUser}});
    }
)

const login = asyncWrapper(
    async(req,res) => {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({status: FAIL, message: 'User not found'});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({status: FAIL, message: 'Invalid Password'});
        const token = await generateJWT({email: user.email, id: user._id, role: user.role});
        res.json({status: SUCCESS,message:'Logged In Successfully' ,data: {token}});
    }
)


module.exports = {
    getAllUsers,
    register,
    login
}