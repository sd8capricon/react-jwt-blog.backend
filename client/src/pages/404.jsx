import React from 'react';
import MyNav from './components/Nav';

function NotFound(){
    return(
        <div style={{background:' rgb(224, 224, 224)'}}>
            <MyNav/>
            <div>
                <h1 style={{textAlign:"center", margin:"2%", marginTop:"40vh"}}>404 Page Not Found</h1>
            </div>
        </div>
    );
}

export default NotFound;