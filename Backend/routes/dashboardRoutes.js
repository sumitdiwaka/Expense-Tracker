const express = require('express')
const {protect} = require('../middleware/authMiddleware');
const {getDashBoard}=require('../controllers/dashboardController')

const router = express.Router();

router.get("/",protect,getDashBoard)

module.exports = router;