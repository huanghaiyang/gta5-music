var express = require('express');
var router = express.Router();
var UserController = require("../../controllers/system/user");
var userController = new UserController();

/* GET music page. */
router.get('/', userController.loginUser);

router.get("/menus", userController.menus);

module.exports = router;