//Imports
const morgan = require('morgan');

require('dotenv').config();
const PORT = process.env.PORT;

const mongoose = require('mongoose');
const cors = require('cors');

const express = require('express');
const app = express();
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const authRouter = require('./routes/auth');


// Express Use

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);


// DB Connection

const connectDB = require('./config/db');

connectDB()
.then(() => {
    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error("MongoDB Connection Error:", err);
    });

    db.on('disconnected', () => {
        console.warn("Connection lost to MongoDB");
    });

    process.on('SIGINT', async () => {
        try{
            console.log('SIGINT received. Closing MongoDB Connection.');
            await mongoose.connection.close();
            console.log('MongoDB connection closed. Exiting process.');
            process.exit(0);
        }catch(err){
            console.error("Error in Closing MongoDB Connection:", err);
        }
    });

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error(`Error Connecting to MongoDB -> ${err}`);
});


// Routes

app.get('/', (req, res) => {
    res.send("Live");
});

