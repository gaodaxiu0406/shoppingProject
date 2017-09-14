import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import host from '../components/host';
import './less/MyCenter.less';
import $ from 'jquery';
import Header from '../components/Header';
export default class MyCenter extends React.Component {
  constructor() {
    super();
    this.state = { myInfo: null }
  }

  changeHide = () => {
    $('.second-menu').stop().toggle(600);
  }
  logout = () => {
    localStorage.removeItem('myInfo');
    // location.reload();
  };
  render() {
    let Content = () => (
      localStorage.getItem('myInfo') ?
        <div className="after-login">
          <div className="basic-info">
            <img src={host + "/userImg/" + JSON.parse(localStorage.getItem('myInfo')).avatar} alt="" />
            <span className="user-name pull-right">
              {JSON.parse(localStorage.getItem('myInfo')).username}
            </span>
          </div>
          <Link to="/orderlist" className="order">
            <div className="myOrder">
              <span className="order-text">我的订单</span>
              <span className="glyphicon glyphicon-menu-right arrow pull-right" />
            </div>
          </Link>
          <div className="userInfoList">
            <div className="first-menu" onClick={this.changeHide}>
              <span>我的信息</span>
              <span className="glyphicon glyphicon-menu-right arrow pull-right" />
            </div>
            <div className="second-menu">
              <Link to="/mydetail">
                <span>个人信息</span>
                <span className="glyphicon glyphicon-menu-right arrow pull-right" />
              </Link>
              <Link to="/address">
                <span>收货地址</span>
                <span className="glyphicon glyphicon-menu-right arrow pull-right" />
              </Link>
            </div>
          </div>
          <div id="logOut" className="btn btn-danger col-xs-10 col-xs-offset-1">
            <div onClick={this.logout}>退出登录</div>
          </div>
        </div>
        :
        <div className="before-login container">
          <div className="row">
            <Link to="/login" className='text-center col-xs-10 col-xs-offset-1' style={{ display: 'block' }}>
              <div className="btn btn-primary col-xs-12" style={{ marginTop: '50px' }}>
                <span>登录</span>
              </div>
            </Link>
          </div>
          <div className="row">
            <Link to="/signup" className='text-center col-xs-10 col-xs-offset-1' style={{ display: 'block' }}>
              <div className="btn btn-default col-xs-12" style={{ marginTop: '30px' }}>
                <span>注册</span>
              </div>
            </Link>
          </div>
        </div>
    );
    return (
      <div>
        <Header title={'个人中心'} />
        <Router>
          <div className="myCenter">
            <Content />
          </div>
        </Router>
      </div>
    )
  }
}

