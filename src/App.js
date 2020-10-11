import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from "history";
import PostList from './containers/PostList';
import Layout from './containers/Layout';
import PostDetail from './containers/PostDetail';
import PostCreate from './containers/PostCreate';
import PostUpdate from './containers/PostUpdate';

const history = createBrowserHistory();

function App() {
 
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/create" component={PostCreate} />
          <Route path="/post/:postSlug" component={PostDetail} />
          <Route path="/post/:postSlug/update" component={PostUpdate} />
          <Route path="/post/:postSlug/delete" component={PostList} />
        </Switch>
      </Layout>
    </Router>

  );
}

export default App;