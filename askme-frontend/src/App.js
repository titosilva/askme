import './App.css';
import SignUpPage from './components/pages/signUpPage';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './components/pages/loginPage';

/**
* Gets the App to render
* @return {React.Component} App component
*/
function App() {
  return (
    <Router>
      <Redirect from="*" to="/signup"></Redirect>
      <Switch>
        <Route path="/signup">
          <SignUpPage></SignUpPage>
        </Route>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
