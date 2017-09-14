
import React, { Component } from 'react';
import './less/MyDetail.less'
import host from '../components/host';
export default class MyDetail extends Component {
  render() {
    return (
      <div>
        <div className="row" >
          <nav className="mynavbar navbar navbar-inverse navbar-fixed-top col-xs-12 " style={{padding:0,textAlign:"left",padding:0}}>
            <d className="glyphicon glyphicon-menu-left col-xs-3 col-xs-offset-1" onClick={() => history.back()} style={{height:'50px',padding:0,lineHeight:'50px'}}/>
            <span className="col-xs-4 text-center" style={{padding:0}}>个人资料</span>
          </nav>
        </div>
        <div className="userDetail">
          <ul className="userDetail-List">
            <li>
              <div className="txt">用户头像</div>
              <div className="avatar">
                <img src={host + "/userImg/" + JSON.parse(localStorage.getItem('myInfo')).avatar} alt="" />
              </div>
            </li>
            <li>
              <div className="txt">会员名</div> 
              <div className="text-right info-txt">{JSON.parse(localStorage.getItem('myInfo')).username}</div>
            </li>
            <li>
              <div className="txt">我的邮箱</div>
              <div className="text-right info-txt">{JSON.parse(localStorage.getItem('myInfo')).email}</div>
            </li>
            <li>
              <div className="txt">性别</div>
              <div className="text-right info-txt">男</div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
