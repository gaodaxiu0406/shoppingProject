import React, { Component } from 'react';
import $ from 'jquery';
import host from '../components/host';
import '../less/nav.less';
export default class Login extends Component {
  constructor() {
    super();
    this.state = { userInfo: {} }
  }
  handleClick = () => {
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    // console.log(username, password);
    $.ajax({
      url: host + '/user/logIn',
      type: 'post',
      data: {
        "username": username,
        "password": password,
      },
      error: function (e) {
        console.log("error", e);
      },
      success: (res) => {
        if (JSON.parse(res) && JSON.parse(res).code == 1) {
          res = JSON.parse(res);
          this.setState({ userInfo: res.userInfo });
          // console.log(this.state.userInfo);
          alert('恭喜您登录成功!');
          localStorage.setItem("myInfo", JSON.stringify(this.state.userInfo));
          this.props.history.push({
            pathname: '/myCenter',
            state: this.state.userInfo
          });
        }
      }
    })
  };
  render() {
    return (
      <div className="wrap">
        <div className="row" >
          <nav className="mynavbar navbar navbar-inverse navbar-fixed-top col-xs-12 " style={{padding:0,textAlign:"left"}}>
            <span className="glyphicon glyphicon-menu-left col-xs-3 col-xs-offset-1" onClick={() => history.back()} style={{height:'50px',padding:0,lineHeight:'50px'}}/>
            <span className="col-xs-4 text-center" style={{padding:0}}>登录</span>
          </nav>
        </div>
        <div className="row col-xs-10 col-xs-offset-1">
          <form method="post" className="form-horizontal">
            <div className="form-group" style={{marginTop:'50px'}}>
              <div className="input-group">
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-user"></span>
                </span>
                <input ref="username" type="text" className="form-control" placeholder="请输入用户名" name="username" required/>
              </div>
            </div>
            <div className="form-group" style={{marginTop:'30px'}}>
              <div className="input-group">
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-send"></span>
                </span>
                <input ref="password" type="password" className="form-control" placeholder="请输入密码" name="password" required/>
              </div>
            </div>
            <div className="form-group" style={{marginTop:'50px'}}>
              <div className="btn btn-primary col-xs-12" onClick={this.handleClick}>登录</div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}