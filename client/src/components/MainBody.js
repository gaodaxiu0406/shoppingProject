import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import OrderList from '../pages/OrderList';
import MyCenter from '../pages/MyCenter';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import MyDetail from '../pages/MyDetail';
import ProductDetail from '../pages/ProductDetail';
import PayOrder from '../pages/PayOrder';
import OrderDetail from '../pages/OrderDetail';
import './less/MainBody.less';
export default class MainBody extends React.Component {
  render() {
    return (
      <div id='main-body' className='main-body'>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/products' component={Products} />
            <Route path='/orderlist' component={OrderList} />
            <Route path='/mycenter' component={MyCenter} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/mydetail' component={MyDetail} />
            <Route path='/productdetail' component={ProductDetail} />
            <Route path='/payorder' component={PayOrder} />
            <Route path='/orderdetail' component = {OrderDetail} />
          </Switch>
        </Router>
      </div>
    )
  }
}