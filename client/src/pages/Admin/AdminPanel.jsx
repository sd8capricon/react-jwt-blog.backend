import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container,Row, Col, Button } from 'react-bootstrap';
import MyNav from '../components/Nav';
import NotLoggedIn from '../components/NotLoggedIn';

 function AdminPanel(){

    const[isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem('admin');
        axios({
            method:'POST',
            url:'/backend/authenticate/verify',
            data:{
                token: token
            }
        }).then((res)=>{
            if(res.data.authStatus === true){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
        }).catch((err)=>{
            console.log(err);
            setIsLoggedIn(false);
        });
    },[]);

    function handleLogout(){
        localStorage.removeItem('admin');
        window.location='/'
    }

     if(isLoggedIn){
         return(
             <div style={{background:' rgb(224, 224, 224)'}}>
                <MyNav/>
                <div className="adminPanel">
                    <h1>Admin Panel</h1>
                    <br/>
                    <Container>
                        <Row>
                            <Col className='panelCol' md={4}>
                                <Link to='/admin/compose'>
                                    <Button variant="dark">
                                        Compose<br/>
                                        Here You Can Compose New Blogs
                                    </Button>
                                </Link>
                            </Col>
                            <Col className='panelCol' md={4}>
                                <Link to='/admin/edit'>
                                    <Button variant="dark">
                                        Edit<br/>
                                        Here You Can Edit Existing Blogs
                                    </Button>
                                </Link>
                            </Col>
                            <Col className='panelCol' md={4}>
                                <Link to='/admin/delete'>
                                    <Button variant="dark">
                                            Delete<br/>
                                            Here You Can Delete Existing Blogs
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='panelCol'>
                                <Button variant="dark" onClick={handleLogout}>
                                    Logout<br/>
                                    Ends Your Admin Session
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
             </div>
         );
     }else{
         return(
            <NotLoggedIn/>
         );
     }
 }

 export default AdminPanel;