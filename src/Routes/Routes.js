import React from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Header from '../Components/Header/Header';

// Importando as páginas
import Login from '../Pages/Login';
import Atendimentos from '../Pages/Atendimentos';

export default class RouterNavigation extends React.Component{
  render(){
    return(
      <Router>
        <div>
          {this.props.authenticated ? (
            <Header/>
          ) : (
            null
          )}
        </div>

        <Switch>
          <ProtectedRoute exact authenticated={this.props.authenticated} path="/" component={Atendimentos} />
          <Route authenticated={this.props.authenticated} path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
} 