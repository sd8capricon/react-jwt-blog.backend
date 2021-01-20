import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MyNav from '../components/Nav';
import '../../App.css';

function AllBlogs(){

    //state
    const[blogs, setBlogs]=useState([]);

    //get blogs
    useEffect(()=>{
        axios({
            method: 'GET',
            url:'http://localhost:5000/blogs',
        }).then((res)=>{
            console.log(res.data);
            setBlogs(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    },[]);
    
    function createPost(post){
        return(
            <div key={post._id} className="mapBlogDiv">
                <h3>{post.title}</h3>
                <p>{post.body.substring(0,400)}
                <br/><Link to={'/blogs/'+post.title}>...Click here to view full post</Link></p>
                <hr/>
            </div>
        );
    }

    return(
        <div style={{background:' rgb(224, 224, 224)'}}>
            <MyNav/>
            {blogs.map(createPost)}
        </div>
    );
}
export default AllBlogs;