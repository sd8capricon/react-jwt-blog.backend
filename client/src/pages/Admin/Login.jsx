import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import MyNav from '../components/Nav';

function Login(){

    //state
    const[username, setUsername]=useState('');
    const[password, setPassword]=useState('');
    const[isError, setIsError]=useState(false);
    const[err, setErr]=useState('');

    //handleChange
    function handleUsername(e){
        setUsername(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }

    //Log User In
    function handleSubmit(e){
        e.preventDefault();
        axios({
            method:'POST',
            url:'/backend/authenticate/login',
            data:{
                username: username,
                password: password
            }
        }).then((res)=>{
            console.log(res.data);
            if(res.data.authenticated === true){
                window.localStorage.setItem('admin', res.data.token);
                window.location='/admin';
            }
            if(res.data.authenticated === false){
                setIsError(true)
                setErr(res.data.error);
            }
        }).catch((err)=>{
            console.log(err);
            setIsError(true);
            setErr('Error Connecting To Server')
        });
    }

    return(
        <div style={{background:' rgb(224, 224, 224)'}}>
            <MyNav/>
            <div className="adminDiv">
                <h1 style={{marginBottom:"5%"}}>Admin Login</h1>  
                <Form className="adminForm adminLoginForm" onSubmit={handleSubmit}>
                    <Form.Label>Username</Form.Label>
                    <br/><Form.Control type="text" value={username} onChange={handleUsername}/>
                    <br/><Form.Label>Password</Form.Label>
                    <br/><Form.Control type="password" autoComplete="on"value={password} onChange={handlePassword}/><br/>
                    <Button variant="dark" type="submit">Log In</Button><br/>
                    {isError?<label style={{color:"red"}}>{err}</label>: <label></label>}
                </Form>
            </div>
        </div>
    );
}

export default Login;