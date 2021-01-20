const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRoutes = require('./routes/authRoutes');
const BlogRoutes = require('./routes/blogRoutes');
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express();

//mongoose
const URI = 'mongodb+srv://'+process.env.DB_USR+':'+process.env.DB_PASS+'@react-jwt-blog.o94vq.mongodb.net/blogsDB?retryWrites=true&w=majority'
try {
    mongoose.connect(URI, { useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false });
    console.log('Connected to MongoDB');
} catch (err) {
    console.log(err);
}

//middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

//routes
app.use(AuthRoutes);
app.use(BlogRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Listening on Port ${PORT}`);
});