const express = require("express");

const { Register, Login } =require("../controllers/userController");
 
const router = express.Router();



  
router.route("/register").post(Register);
router.route("/login").post(Login);


 
module.exports=  router ;