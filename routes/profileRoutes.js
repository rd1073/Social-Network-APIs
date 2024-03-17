const express = require("express");

const { viewProfile, deleteProfile ,updateProfile} =require("../controllers/profileController");
 
const router = express.Router();

const { protect }=require("../config/auth")

  

router.post('/view-profile', protect, viewProfile);
router.post('/delete-profile', protect, deleteProfile);
router.post('/update-profile', protect, updateProfile);
 
 
module.exports=  router ;