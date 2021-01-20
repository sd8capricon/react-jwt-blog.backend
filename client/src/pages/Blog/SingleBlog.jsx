import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyNav from '../components/Nav';

function SingleBlog(){

    const { post }=useParams();
    const [blog, setBlog] = useState([]);

    useEffect(()=>{
        axios({
            method: 'GET',
            url: '/backend/blogstitle/'+post,
        }).then((res)=>{
            setBlog(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    },[post]);

    return(
        <div style={{background:' rgb(224, 224, 224)'}}>
            <MyNav/>
            <div className="mapBlogDiv">
                <h1>{blog.title}</h1>
                <p>{blog.body}</p>
            </div>
        </div>
    );
}

export default SingleBlog;