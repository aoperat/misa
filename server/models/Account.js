//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
    date:{
        type: String,
        required: true
        // maxlength: 50
    },
    description:{
        type: String,
        required: true
        // trim: true,
        // unique: 1
    },
    amount:{
        type: String,
        required: true
        // minlength: 5
    },
    category: {
        type: String,
        required: true
        // maxlength: 50
    },
    paymentMethod: {
        type: String,
        required: true
        // default: 0
    },
    userId:{
        type: String,
        required: true
    }
})



const Account = mongoose.model('Account',accountSchema)
//module.exports = {User}
export default Account;