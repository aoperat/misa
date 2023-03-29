//index.js

// Import libraries
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Import Controllers
import userControllers from './controllers/userController.js'
import accountControllers from './controllers/accountController.js';
import cardControllers from './controllers/cardController.js';

// Import configuration
import config from './config/dev.js';

// Set up express app
const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


//user
app.use('/api/users', userControllers);

//account
app.use('/api/account', accountControllers);

//card
app.use('/api/card', cardControllers);



