import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Router, Route, Switch} from 'react-router-dom';
import { history } from './helpers';
import PostList from './containers/PostList';
import Layout from './containers/Layout';
import PostDetail from './containers/PostDetail';
import PostCreate from './containers/PostCreate';
import PostUpdate from './containers/PostUpdate';
import Login from './containers/Login';
import Signup from './containers/Signup';
import PrivateRoute  from './components/PrivateRoute'




function App() {
 
  return (
    <Router history={history}>
      <Layout>
        <Switch>    
          <Route exact path="/" component={PostList} />
          <PrivateRoute path="/create" component={PostCreate} />
          <Route exact path="/posts/:postSlug" component={PostDetail} />
          <Route path="/posts/:postSlug/update" component={PostUpdate} />
          <Route path="/posts/:postSlug/update" component={PostUpdate} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Layout>
    </Router>

  );
}

export default App;
