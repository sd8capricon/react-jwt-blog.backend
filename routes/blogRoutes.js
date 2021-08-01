const mongoose = require('mongoose');
const Post = require('../models/blogSchema');
const express = require('express');
const router = express.Router();

router.get('/blogs', (req, res)=>{
    Post.find({}, (err, result)=>{
        if(err){
            console.log(err);
            res.json(err)
        }else{
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/blogstitle/:title', (req, res)=>{
    postTitle = req.params.title;
    console.log(postTitle);
    Post.findOne({ title:postTitle}, (err, blog)=>{
        if(blog){
            console.log(blog);
            res.json(blog);
        }
        if(err){
            console.log(err);
        }
    });
});

router.get('/blogsid/:id', (req, res)=>{
    const postId = req.params.id;
    console.log(postId);
    Post.findOne({ _id:postId }, (err, blog)=>{
        if(blog){
            console.log(blog);
            res.json(blog);
        }
        if(err){
            console.log(err);
        }
    });
});

router.post('/compose', (req, res)=>{
    const postTitle = req.body.title;
    const postContent = req.body.content;
    const post = new Post({
        title: postTitle,
        body: postContent
    });
    post.save(function(err, result){
        if(err){
            res.status(200).json({
                isError: true,
                error: err
            });
        }else{
            console.log(result);
            res.status(200).json({
                isError: false,
                result: result
            })
        }
    });
});

router.post('/delete/:id', (req, res)=>{
    const postId = req.params.id
    console.log(postId);
    Post.findOneAndDelete({ _id:postId }, (err, result)=>{
        if(err){
            console.log(err);
            res.json(err);
        }
        else if(!err){
            console.log(result);
            res.status(200).json(result);
        }
    });
});

router.post('/update/:id', (req, res)=>{
    const postId = req.params.id;
    const newPostTitle = req.body.title;
    const newPostContent = req.body.content;
    Post.findOneAndUpdate({ _id:postId }, { title: newPostTitle, body: newPostContent }, { new: true }, (err, result)=>{
        if(!err){
            console.log(result);
            res.status(200).json({
                isError: false,
                result: result
            })
        }
        else{
            console.log(err);
            res.status(200).json({
                isError: true,
                error: err
            });
        }
    });
});


module.exports = router;