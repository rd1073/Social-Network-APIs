require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const conn=require("./config/db")
const userRoutes=require("./routes/userRoutes")
const profileRoutes=require("./routes/profileRoutes")
const postRoutes=require("./routes/postRoutes")


const app = express();
app.use(express.json());

 
app.use("/auth", userRoutes);
app.use("/profile", profileRoutes);
app.use("/post", postRoutes);

 
app.listen(process.env.PORT,console.log(`Server running on 3000`));


 
 


 



 