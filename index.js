//const express = require('express')
import express from 'express'
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));

import User from "./model/User.js";
//const {User} = require("./models/User")

const port = 3000

//const mongoose = require('mongoose')
import mongoose from 'mongoose';

import config from './config/dev.js'


mongoose.set('strictQuery',true)

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.post('/register',(req,res)=>{
    
    //회원가입할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    console.log(req.body)
    const user = new User(req.body);
    
    user.save((err,userInfo) =>{
        console.log(userInfo)
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success: true
        })
    });

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})