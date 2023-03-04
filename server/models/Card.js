import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    cardType:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    startDate:{
        type: Number,
    },
    endDate: {
        type: Number,
    },
    paymentDate: {
        type: Number,
    },
    userId:{
        type: String,
        required: true
    }
});

const Card = mongoose.model('Card',cardSchema)
export default Card;
