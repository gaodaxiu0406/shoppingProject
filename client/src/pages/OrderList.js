import React from 'react';
import { Route, Link } from 'react-router-dom';
import OrderType from '../components/OrderType';
import './less/OrderList.less';
import Header from '../components/Header';
export default class OrderList extends React.Component {
    render() {
        return (
            <div>
                <Header title={'订单中心'}/>
                <ul className="nav-by-ordertype">
                    <li className="nav-ordertype-item"><Link to={{ pathname: "/orderlist" ,query: { ordertype: 100 } }}>全部</Link></li>
                    <li className="nav-ordertype-item"><Link to={{ pathname: "/orderlist/unpayed", query: { ordertype: 0 } }}>待付款</Link></li>
                    <li className="nav-ordertype-item"><Link to={{ pathname: "/orderlist/completed", query: { ordertype: 1 } }}>已完成</Link></li>
                </ul>
                <Route exact path="/orderlist" component={OrderType} />
                <Route path="/orderlist/unpayed" component={OrderType} />
                <Route path="/orderlist/completed" component={OrderType} />
            </div>
        )
    }
}