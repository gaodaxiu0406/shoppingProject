import React from 'react';
import { Route, Link } from 'react-router-dom';
import HotList from '../components/HotList';
import ProductType from '../components/ProductsType';
import './less/Products.less';
import Header from '../components/Header';

export default class List extends React.Component {
  render() {
    return (
        <div>
          <Header title={'特产中心'}/>
          <ul className="nav-by-type">
            <li className="nav-type-item">
              <Link to="/products">热销特产</Link>
            </li>
            <li className="nav-type-item">
              <Link to={{pathname:"/products/northeast",query:{type:"northeast"}}}>东北特产</Link></li>
            <li className="nav-type-item">
              <Link to={{pathname:"/products/north",query:{type:"north"}}}>华北特产</Link>
            </li>
            <li className="nav-type-item">
              <Link to={{pathname:"/products/south",query:{type:"south"}}}>华南特产</Link>
            </li>
            <li className="nav-type-item">
              <Link to={{pathname:"/products/other",query:{type:"other"}}}>其它地区</Link>
            </li>
          </ul>
            <Route exact path="/products" component={HotList} />
            <Route path="/products/northeast" component={ProductType}/>
            <Route path="/products/north" component={ProductType}/>
            <Route path="/products/south" component={ProductType}/>
            <Route path="/products/other" component={ProductType}/>
        </div>
    )
  }
}