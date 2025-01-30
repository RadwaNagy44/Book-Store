const express = require('express');
const app = express();
const router = express.Router();
const userController = require('../controllers/userControl');
const verifyToken = require('../middleWares/verifyToken');
app.use(express.json());


router.route('/')
      .get(verifyToken,userController.getAllUsers)
router.route('/register')
      .post(userController.register)
router.route('/login')
      .post(userController.login)
      
module.exports = router;
