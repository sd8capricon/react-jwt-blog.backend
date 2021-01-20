import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Button, FormLabel } from 'react-bootstrap';
import MyNav from '../components/Nav';
import NotLoggedIn from '../components/NotLoggedIn';

function Delete(){

    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[id, setId]=useState('select');
    const[posts, setPosts]=useState([]);
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');     
    
    //To Verify Token and to get blogs
    useEffect(()=>{
        const token = localStorage.getItem('admin');
        jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded)=>{
            if(!err){
                console.log('ran');
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
        });
        axios({
            method: 'GET',
            url: 'http://localhost:5000/blogs'
        }).then((res)=>{
            setPosts(res.data);
        });
    },[]);

    //For getting title and body after selection
    useEffect(()=>{
        if(id !== 'select'){
            console.log('get ran');
            axios({
                method: 'GET',
                url: 'http://localhost:5000/blogsid/'+id
            }).then((res)=>{
                setTitle(res.data.title);
                setBody(res.data.body)
            });
        }else{
            console.log(id);
        }
    },[id]);

    function handleSelect(e){
        console.log(e.target.value);
        setId(e.target.value);
    }

    function handleDelete(){
        console.log('del function ran');
        if(id !== 'select'){
            axios({
                method: 'POST',
                url: 'http://localhost:5000/delete/'+id
            }).then((res)=>{
                if(res.status === 200){
                    console.log('Blog Deleted');
                    window.location='/admin'
                }
            });
        }else{
            alert('Select A Blog To Delete');
        }
    }

    if(isLoggedIn){
        return(
            <div style={{background:' rgb(224, 224, 224)'}}>
                <MyNav/>
                <div>
                    <h1 style={{textAlign:"center", margin:"2%"}}>Delete Blog</h1>
                    <div className="adminForm">
                        <FormLabel>Select Blog</FormLabel><br/>
                        <select onChange={handleSelect}>
                            <option value='select'>Select</option>
                            {
                                posts.map((post)=>{
                                    return(
                                        <option value={post._id} key={post._id}>{post.title}</option>
                                    );
                                })
                            }
                        </select>
                        <br/><br/>
                        <h2 style={{color:"rgb(80,80,80)"}}>Title:</h2>
                        <h3>{title}</h3><br/>
                        <h2 style={{color:"rgb(80,80,80)"}}>Body:</h2>
                        <p>{body}</p>
                        <Button variant="dark" onClick={handleDelete} type='submit'>Delete</Button><br/>
                        <p/>
                        <Link to='/admin'><Button variant="dark">Back To Panel</Button></Link>
                    </div>
                </div>
                <br/>
            </div>
        );
    }else{
        return(
            <NotLoggedIn/>
        );
    }
}

export default Delete;