import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AllBlogs from './pages/Blog/AllBlogs';
import SingleBlog from './pages/Blog/SingleBlog';
import AdminPanel from './pages/Admin/AdminPanel';
import Login from './pages/Admin/Login';
import Compose from './pages/Admin/Compose';
import Edit from './pages/Admin/Edit';
import Delete from './pages/Admin/Delete';
import NotFound from './pages/404';

function App() {
  return (
    <div>
        <Router>
            <Switch>
              <Route exact path='/blogs' component={AllBlogs}/>
              <Route path='/blogs/:post' component={SingleBlog}/>
              <Route exact path='/admin' component={AdminPanel}/>
              <Route path='/admin/login' component={Login}/>
              <Route path='/admin/compose' component={Compose}/>
              <Route path='/admin/edit' component={Edit}/>
              <Route path='/admin/delete' component={Delete}/>
              <Route exact path='/' component={Home}/>
              <Route component={NotFound}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
