import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'
import NotLoggedIn from '../components/NotLoggedIn';
import MyNav from '../components/Nav';

function Compose(){

    //state
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[isError, setIsError]=useState(false);
    const[error, setError]=useState('');
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');

    //Verify Token
    useEffect(()=>{
        const token = localStorage.getItem('admin');
        jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decoded)=>{
            if(!err){
                setIsLoggedIn(true);
            }else{
                console.log(err);
                setIsLoggedIn(false);
            }
        })
    },[]);

    //Handle Form
    function handleTitle(e){
        setTitle(e.target.value)
    }
    function handleBody(e){
        setBody(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'http://localhost:5000/compose',
            data:{
                title: title,
                content: body
            }
        }).then((res)=>{
            console.log(res);
            if(res.data.isError === false){
                window.location='/admin'
            }else if(res.data.isError === true){
                setIsError(true);
                if(res.data.error.message === 'Post validation failed: body: Path `body` is required.'){
                    setError('Body of the blog cannot be empty');
                }else if(res.data.error.message === 'Post validation failed: title: Path `title` is required.'){
                    setError('Title of the blog cannot be empty');
                };;
            }
        }).catch((err)=>{
            console.log(err);
            setIsError(true);
            setError('Error Connecting To Server');
        });
    }    

    if(isLoggedIn){
        return(
            <div style={{background:' rgb(224, 224, 224)'}}>
                <MyNav/>
                <div>
                    <h1 style={{textAlign:"center", margin:"2%"}}>Compose Blog</h1>
                    <Form className="adminForm" onSubmit={handleSubmit}>
                        <Form.Label>Title</Form.Label><br/>
                        <Form.Control type="text" onChange={handleTitle} value={title}/><br/>
                        <Form.Label>Body</Form.Label><br/>
                        <Form.Control as="textarea" rows={12} onChange={handleBody} value={body}/><br/>
                        <Button variant="dark" type="submit">Submit</Button>
                        {isError?<p style={{color:"red"}}>{error}</p>:<p></p>}
                        <Link to='/admin'><Button variant="dark">Back To Panel</Button></Link>
                    </Form>
                </div>
            </div>
        );
    }else{
        return(
            <NotLoggedIn/>
        );
    }
}

export default Compose;