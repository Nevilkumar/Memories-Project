import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended:true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

mongoose.connect('mongodb://localhost:27017/MERN', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(8000, () => console.log("Listening On Port 8000")))
    .catch((err) => console.log(err));