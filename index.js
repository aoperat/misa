//const express = require('express')
import express from 'express'
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import cookieParser from 'cookie-parser';
app.use(cookieParser());

import User from "./model/User.js";
//const {User} = require("./models/User")

const port = 3000

//const mongoose = require('mongoose')
import mongoose from 'mongoose';
import config from './config/dev.js'


mongoose.set('strictQuery', true)

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.post('/register', (req, res) => {

    //회원가입할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    console.log(req.body)
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    });

})

app.post('/login', (req, res) => {
    //로그인 
    //1. 요청된 이메일을 데이터베이스에서 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //2. 요청된 이메일이 있는 경우, 비밀번호가 맞는지 체크.
        user.comparePassword(req.body.password, (err, isMatched) => {
            if (!isMatched) {
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            }

            //3. 비밀번호 일치시 토큰 생성.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰 저장. 어디에? 쿠키, 로컬스토리지 중 쿠키

                res.cookie("x_auth", user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id})
            })
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})