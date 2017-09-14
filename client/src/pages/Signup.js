import React, { Component } from 'react';
import $ from 'jquery';
import host from '../components/host';
import '../less/nav.less';
export default class Signup extends Component {
  handleClick = () => {
    let password = this.refs.password.value;
    let password2 = this.refs.password2.value;
    if (password !== password2) {
      this.refs.password.value = null;            
      this.refs.password.onfocus;
      this.refs.password2.value = null;      
    } else {
      let formData = document.getElementById('form-signup');
      let oData = new FormData(formData);
      console.log(oData);
      $.ajax({
        url: host + '/user/signUp',
        type: 'post',
        data: oData,
        processData: false,  // 告诉jQuery不要去处理发送的数据
        contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
        error: function (e) {
          console.log("error", e);
        },
        success: (res) => {
          if (JSON.parse(res).code) {
            this.props.history.push("/login");
          } else {
            console.log(res);
            alert("用户名已存在，请重新注册！")
          }
        }
      })
    }
  };
  render() {
    return (
      <div className="wrap">
        <div className="row">
          <nav className="mynavbar navbar navbar-inverse navbar-fixed-top col-xs-12" style={{ padding: 0, textAlign: "left", padding: 0 }}>
            <span className="glyphicon glyphicon-menu-left col-xs-3 col-xs-offset-1" onClick={() => history.back()} style={{ height: '50px', padding: 0, lineHeight: '50px' }} />
            <span className="col-xs-4 text-center" style={{ padding: 0 }}>注册</span>
          </nav>
        </div>
        <div className="row col-xs-10 col-xs-offset-1">
          <form method="post" className="form-horizontal" id="form-signup">
            <div className="form-group" style={{ marginTop: '50px' }}>
              <div className="input-group">
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-user"></span>
                </span>
                <input type="text" className="form-control" placeholder="请输入用户名" name="username" required />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <div className="input-group">
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-send"></span>
                </span>
                <input ref="password" type="password" className="form-control" placeholder="请输入密码" name="password" required />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <div className="input-group">
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-send"></span>
                </span>
                <input ref="password2" type="password" className="form-control" placeholder="请再次输入密码" name="password2" required />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <div className="input-group">
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-envelope"></span>
                </span>
                <input type="email" className="form-control" placeholder="请输入您的邮箱" name="email" required />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <div className="input-group">
                <span className="input-group-addon">
                  <span className="glyphicon glyphicon-picture"></span>
                </span>
                <input type="file" className="form-control" name="avatar" required accept="image/*" />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '50px' }}>
              <div className="btn btn-primary col-xs-12" onClick={this.handleClick}>注册</div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}