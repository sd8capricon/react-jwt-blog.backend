import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import MyNav from './Nav';
import '../../App.css';

export default function NotLoggedIn(){
    return(
        <div style={{background:' rgb(224, 224, 224)'}}>
            <MyNav/>
            <div className="adminDiv">
                 <h1>Admin User is not logged in</h1>
                 <Link to='/'><Button variant="dark">Home</Button></Link>{' '}
                 <Link to='/blogs'><Button variant="dark">Blogs</Button></Link>{' '}
                 <Link to='/admin/login'><Button variant="dark">Login</Button></Link>{' '}
            </div>
        </div>
    );
}