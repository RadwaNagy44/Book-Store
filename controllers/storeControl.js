const express = require('express');
const app = express();
const {validationResult} = require('express-validator');
app.use(express.json());
const {SUCCESS,FAIL} = require('../utils/httpStatusText');
const Store = require('../models/storeModel');
const asyncWrapper = require('../middleWares/asyncWrapper');
const appError = require('../utils/appError');

const getAllStoreItems = asyncWrapper( 
          async (req, res) => {
    const query = req.query;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const page = query.page ? parseInt(query.page) : 1;
    const skip = (page - 1) * limit;
    const storeItems = await Store.find({},{"__v": false}).limit(limit).skip(skip);
    res.json({status: SUCCESS, data: {storeItems}});
});

const getSingleStoreItem = asyncWrapper(
    async (req, res) => {
        const store = await Store.findById(req.params.itemId);
        if(!store){
            const error = appError.create("Item not found", 404 , {status: FAIL});
            return next(error);
        }
        return res.json({status: SUCCESS, data: {store}});
    });

const addStoreItem = asyncWrapper(
          async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = appError.create(errors.array(), 400 , {status: FAIL});
        return next(error);
    }
    const newItem = new Store(req.body);
    await newItem.save();
    res.status(201).send({status: SUCCESS, data: {Item: newItem}});
});

const updateStoreItem = asyncWrapper(
         async (req, res) => {
    const itemId = req.params.itemId;
    const updatedItem = await Store.findByIdAndUpdate(itemId,{$set: {...req.body} }, {new: true});
    return res.status(200).json({status: SUCCESS, data: {Item: updatedItem}});
});

const deleteStoreItem = asyncWrapper( 
    async  (req,res) => {
    await Store.findByIdAndDelete(req.params.itemId);
    res.status(200).json({status: SUCCESS, data: null});
});

module.exports = {
    getAllStoreItems,
    getSingleStoreItem,
    addStoreItem,
    updateStoreItem,
    deleteStoreItem
};
