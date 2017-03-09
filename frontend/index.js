import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link, IndexRoute, Redirect } from 'react-router';
import App from './app/app.js';
import Home from './app/screens/Home';
import Quiz from './app/screens/Quiz';
import User from './app/screens/User';
import questionBase from './app/screens/Question/Add';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="quiz" component={Quiz} />
      <Route path="question">
        <Route path="add" component={questionBase} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('container')
);
