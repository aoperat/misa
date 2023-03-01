//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})



const Category = mongoose.model('Account',categorySchema)
//module.exports = {User}
export default Category;