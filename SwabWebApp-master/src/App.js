import logo from './logo.svg';
import './App.css';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AddOrder } from './AddOrder';
import AddAccount from './AddAccount';
import { AddComponent } from './AddComponent';
import { Layout } from './component/Layout';
import { NavigationBar } from './component/NavigationBar';
import Order from './component/Order/Order';
import Accountform from './component/Accountform';
import Home from './component/Home';
import Login from './Login';
function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/addoder" component={AddOrder} />
            <Route path="/addaccount" component={AddAccount} />
            <Route path="/addcomponent" component={AddComponent} />
            <Route path="/accountform" component={Accountform} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
