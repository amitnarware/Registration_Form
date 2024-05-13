import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import ForgotPassword from './Components/ForgotPassword';
import UserList from './Components/UserList';
import UserEdit from './Components/UserEdit';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={RegistrationForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/user-list" component={UserList} />
          <Route exact path="/user-edit/:id" component={UserEdit} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
