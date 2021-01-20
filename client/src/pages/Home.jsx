import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import MyNav from './components/Nav';
import '../App.css';

function Home(){

    return(
        <div style={{background:' rgb(224, 224, 224)'}}>
            <MyNav/>
            <div className='homeInnerDiv'>
                <h1 className='pageHeading'>Home</h1>
                <p className='homePara'>This is the Home Page of my project. The Admin Authenticatin is Handled by using JWT and Blogs are Stored in MongoDB atlas. The Blogs are displayed as per the time and date of creation, press the button below to view blogs at glance</p>
                <Link to='/blogs'><Button variant="dark">To Blogs</Button></Link>
            </div>
        </div>
    );
}
export default Home;