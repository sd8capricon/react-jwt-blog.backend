require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const AuthRoutes = require('./routes/authRoutes');
const BlogRoutes = require('./routes/blogRoutes');

const PORT = process.env.PORT || 5000
const app = express();

//mongoose
const URI = 'mongodb+srv://'+process.env.DB_USR+':'+process.env.DB_PASS+'@react-jwt-blog.o94vq.mongodb.net/blogsDB?retryWrites=true&w=majority'
mongoose.connect(URI, { useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false })
    .then(()=>console.log("Connected to MongoDB"))
    .catch(()=>console.log("Error Connecting"));
    
//middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://reactjwtblog.web.app', 'https://sd8capricon.github.io'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/backend/authenticate',AuthRoutes);
app.use('/backend', BlogRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Listening on Port ${PORT}`);
});