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
mongoose.set('strictQuery',true)

mongoose.connect('mongodb+srv://user:1234@clusternodetodo.hbqeu.mongodb.net/?retryWrites=true&w=majority',{
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

    const user = new User(req);
    user.save((err,userInfo) =>{
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success: true
        })
    });

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})