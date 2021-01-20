import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import MyNav from '../components/Nav';
import NotLoggedIn from '../components/NotLoggedIn';

function Edit(){

    //state
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[isError, setIsError]=useState(false);
    const[error, setError]=useState('');
    const[id, setId]=useState('select');
    const[posts, setPosts]=useState([]);
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');
    
    //To Verify Token and to get blogs
    useEffect(()=>{
        const token = localStorage.getItem('admin');
        axios({
            method:'POST',
            url:'/backend/authenticate/verify',
            data:{
                token: token
            }
        }).then((res)=>{
            console.log(res);
            if(res.data.authStatus === true){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
        }).catch((err)=>{
            console.log(err);
            setIsLoggedIn(false);
        });
        axios({
            method: 'GET',
            url: '/backend/blogs'
        }).then((res)=>{
            setPosts(res.data);
        });
    },[]);

    //Handle Form
    function handleTitle(e){
        setTitle(e.target.value)
    }
    function handleBody(e){
        setBody(e.target.value)
    }
    function handleSelect(e){
        console.log(e.target.value);
        setId(e.target.value);
    }

    //To Submit Changes
    function handleSubmit(e){
        e.preventDefault();
        if(id !== 'select'){
            axios({
                method: 'POST',
                url: '/backend/update/'+id,
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
                }
            }).catch((err)=>{
                console.log(err);
                setIsError(true);
                setError('Error Connecting To Server');
            });
        }else{
            alert('Please Select Blog To Edit')
        }
    }

    //For getting title and body after id selection
    useEffect(()=>{
        if(id !== 'select'){
            console.log('get ran');
            axios({
                method: 'GET',
                url: '/backend/blogsid/'+id
            }).then((res)=>{
                setTitle(res.data.title);
                setBody(res.data.body);
            });
        }else{
            setTitle('');
                setBody('');
        }
    },[id]);

    if(isLoggedIn){
        return(
            <div style={{background:' rgb(224, 224, 224)'}}>
                <MyNav/>
                <div>
                    <h1 style={{textAlign:"center", margin:"2%"}}>Edit Blog</h1>
                    <Form className="adminForm"  onSubmit={handleSubmit}>
                        <Form.Label>Select Blog</Form.Label><br/>
                        <select onChange={handleSelect}>
                            <option value='select'>Select</option>
                            {
                                posts.map((post)=>{
                                    return(
                                        <option value={post._id} key={post._id}>{post.title}</option>
                                    );
                                })
                            }
                        </select><br/><br/>
                        <Form.Label>Title</Form.Label><br/>
                        <Form.Control type="text" onChange={handleTitle} value={title}/><br/>
                        <Form.Label>Body</Form.Label><br/>
                        <Form.Control as="textarea" rows={12} onChange={handleBody} value={body}/><br/>
                        <Button variant="dark" type="submit">Submit</Button>
                        {isError?<p>{error}</p>:<p></p>}
                        <Link to='/admin'><Button variant="dark">Back To Panel</Button></Link>
                    </Form>
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

export default Edit;