//const mongoose = require('mongoose');
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
//var jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'
const saltRounds = 10;




const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save',function(next){

    
    var user = this;
    //비밀번호 암호화

    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err);
                user.password = hash;
                console.log(user.password)
                next();
            });
        });
    }else{
        next();
    }
})




userSchema.methods.generateToken = function(callback){

    var user = this;
    //jsonwebtoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken');

    user.token = token;
    user.save(function(err, user){
        if(err) return callback(err);
        callback(null, user);
         
    })
    //user._id + 'secretToken' = token

}

userSchema.methods.comparePassword = function(plainPassword, callback){
    
    //plainPassword 
    bcrypt.compare(plainPassword, this.password, function(err, isMatched){
        if(err) return callback(err);

        callback(null, isMatched);

    })

}

const User = mongoose.model('User',userSchema)
//module.exports = {User}
export default User;