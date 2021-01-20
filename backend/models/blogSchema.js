const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        required: true,
        unique: true,
        type: String
    },
    body:{
        required: true,
        type: String
    }
});

const Post = new mongoose.model('Post', blogSchema);

module.exports = Post;