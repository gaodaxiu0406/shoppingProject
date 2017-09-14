import React from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './less/Footer.less';

export default class Footer extends React.Component {
    render() {
        return (
            <Router>
                <nav id="footer" className="mynavbar navbar navbar-inverse navbar-fixed-bottom">
                    <Route render={({match,location})=>{
                        {/* console.log(match); */}
                        {/* console.log(location); */}
                        return(
                            <ul className="container">
                                <li className="nav-item">
                                    <Link to="/">  
                                        <i className='glyphicon glyphicon-home' />
                                        <span>首页</span>
                                    </Link>  
                                </li>
                                <li className="nav-item">  
                                    <Link to="/products"> 
                                        <i className='glyphicon glyphicon-th' />
                                        <span>特产</span>
                                    </Link> 
                                </li>
                                <li className="nav-item">
                                    <Link to='/orderlist'> 
                                        <i className='glyphicon glyphicon-list-alt' />
                                        <span>订单</span>
                                    </Link> 
                                </li>
                                <li className="nav-item">
                                    <Link to='/mycenter'> 
                                        <i className='glyphicon glyphicon-user' />
                                        <span>我的</span>
                                    </Link> 
                                </li>
                            </ul>
                        )
                    }}/>
                </nav>
            </Router>
        )
    }
}

