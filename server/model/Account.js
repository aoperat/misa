//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
    date:{
        type: String,
        // maxlength: 50
    },
    description:{
        type: String,
        // trim: true,
        // unique: 1
    },
    amount:{
        type: String,
        // minlength: 5
    },
    category: {
        type: String,
        // maxlength: 50
    },
    paymentMethod: {
        type: String,
        // default: 0
    }
})

// accountSchema.pre('save',function(next){

    
//     var user = this;
//     //비밀번호 암호화

//     if(user.isModified('password')){
//         bcrypt.genSalt(saltRounds, function(err, salt) {
//             if(err) return next(err)
            
//             bcrypt.hash(user.password, salt, function(err, hash) {
//                 // Store hash in your password DB.
//                 if(err) return next(err);
//                 user.password = hash;
//                 console.log(user.password)
//                 next();
//             });
//         });
//     }else{
//         next();
//     }
// })




// userSchema.methods.generateToken = function(callback){

//     var user = this;
//     //jsonwebtoken을 이용해서 token 생성하기
//     var token = jwt.sign(user._id.toHexString(), 'secretToken');

//     user.token = token;
//     user.save(function(err, user){
//         if(err) return callback(err);
//         callback(null, user);
         
//     })
//     //user._id + 'secretToken' = token

// }

// userSchema.methods.comparePassword = function(plainPassword, callback){
//     //plainPassword 
//     bcrypt.compare(plainPassword, this.password, function(err, isMatched){
//         if(err) return callback(err);

//         callback(null, isMatched);

//     })
// };

// //선언없이 메서드 호출을 위해 statics 사용
// userSchema.statics.findByToken = function(token, callback){
//     console.log("user.findByToken")

//     var user = this;
    
//     //토큰을 decode 한다.
//     jwt.verify(token,'secretToken',function(err,decoded){
//         //유저 아이디를 이용해서 유저를 찾은 다음에
//         // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

//         user.findOne({ "_id": decoded, "token": token }, function (err, user) {
//             if (err) return callback(err);
//             callback(null, user);
//         })
//     })
// };

const Account = mongoose.model('Account',accountSchema)
//module.exports = {User}
export default Account;