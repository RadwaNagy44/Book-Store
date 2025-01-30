const express = require('express');
const app = express();
const router = express.Router();
const verifyToken = require('../middleWares/verifyToken');
app.use(express.json());
const storeController = require('../controllers/storeControl');
const { validationSchema } = require('../middleWares/validationSchema');
const allowedTo = require('../middleWares/allowedTo');
const userRoles = require('../utils/userRoles');

router.route('/')
      .get(storeController.getAllStoreItems)
      .post(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),validationSchema(), storeController.addStoreItem);

router.route('/:itemId')
      .get(storeController.getSingleStoreItem)
      .patch(verifyToken,allowedTo(userRoles.MANAGER),storeController.updateStoreItem)
      .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),storeController.deleteStoreItem);

module.exports = router;
