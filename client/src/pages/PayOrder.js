import React from 'react';
import host from '../components/host';
import './less/PayOrder.less';
import { withRouter,Link } from "react-router-dom";
import $ from 'jquery';
import Header from '../components/Header';
class PayOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      count: 1,
      orderNumber: ''
    }
  }
  componentDidMount() {
    // 组件挂载后把产品数据保存的自己的状态中
    this.setState({
      data: this.props.history.location.state
    });
    // 如果是从订单列表的立即购买跳转过来的,则携带了订单号,保存到状态中
    if (this.props.history.location.state.orderNumber) {
      this.setState(
        { orderNumber: this.props.history.location.state.orderNumber },
      );
    }
  }
  handleClick = (e) => {
    // console.log(e.target.innerText);
    if (e.target.innerText == "+") {
      this.setState({ count: this.state.count + 1 });
    } else if (e.target.innerText == "-" && this.state.count > 1) {
      this.setState({ count: this.state.count - 1 });
    }
  };
  // 点击结算,提交订单,并生成一个订单号,并显示付款页面
  clickCalculate = () => {
    // 如果是从订单列表的立即支付跳转过来,或者是点了结算,又点了取消,又点结算,说明已经有订单号了,不需要再提及订单,只需要显示付款界面付款即可
    if(!localStorage.getItem("myInfo")){// 没登录
      console.log('没登录,没法看到订单');
      this.props.history.push({
        pathname:'/login',
      })
    }else{
      if (this.state.orderNumber == '') {
        $.ajax({
          url: host + '/order/addOrder',
          method: 'post',
          dataType: 'json',
          data: {
            purchaser: JSON.parse(localStorage.getItem('myInfo'))._id,//从localstorage中读取当前登录的用户信息
            productName: this.props.history.location.state._id,//给后台传的是产品的id
            count: this.state.count
          },
          success: (res) => {
            // console.log(res);
            $('.pay').stop().show(600);
            // 如果订单提交成功,后台把当前的订单号返回过来,然后将订单号保存的组件的state中
            let { orderNumber } = res;
            if (res.code == 1) {
              this.setState({ orderNumber });
            }
          },
          error: (e) => {
            console.log(e);
          }
        })
      } else {
        $('.pay').stop().show(600);
      }
    }
  };
  // 确认付款
  clickConfim = () => {
    let { orderNumber } = this.state;
    $.ajax({
      url: host + '/order/payorder',
      method: 'post',
      dataType: 'json',
      data: { orderNumber },
      success: (res) => {
        // console.log(res);
        $('.pay-success').show(600);
        setTimeout(() => {
          this.props.history.push({
            pathname: '/orderDetail/' + orderNumber,
            state: { orderNumber }
          })
        }, 3000)
      },
      error: (e) => {
        console.log(e);
      }
    })
  };
  // 取消付款
  clickCancel = () => {
    $('.pay').stop().hide(600);
  };
  render() {
    // console.log(this.props.history.location.state);
    return (
      <div>
        <Header title={'结算中心'} />
        {
          localStorage.getItem('myInfo')
          ?
          <div className="wrap">
            <ul className="payList">
              {
                <li className="pay-item">
                  <div className="pay-item-img">
                    <img src={host + '/productImg/' + this.props.history.location.state.productImg} />
                  </div>
                  <div className="pay-item-text">
                    <div className="pay-item-name">
                      {this.props.history.location.state.productName}
                    </div>
                    <div className="pay-item-describe">
                      {this.props.history.location.state.describe}
                    </div>

                    <div className="pay-item-number">
                      <div className="pay-item-price">
                        ￥{this.props.history.location.state.price}元/{this.props.history.location.state.spec}
                      </div>
                      <div className="pay-counter">
                        <span className="count-change" onClick={this.handleClick}>-</span>
                        <span className="count">{this.state.count}</span>
                        <span className="count-change" onClick={this.handleClick}>+</span>
                      </div>
                    </div>
                  </div>
                </li>
              }
            </ul>
            <div className="pay-center">
              <div className="calculate">
                <span className="total">合计:￥{this.props.history.location.state.price * this.state.count}元</span>
                <span className="pay-btn" onClick={this.clickCalculate}>结算</span>
              </div>
              <div className="pay">
                <span className="total-info">
                  <p>确认付款</p>
                  <p>￥{this.props.history.location.state.price * this.state.count}</p>
                </span>
                <span className="pay-btn-confim">
                  <span className="cancel" onClick={this.clickCancel}>取消</span>
                  <span className="checkout" onClick={this.clickConfim}>确定</span>
                </span>
              </div>
              <div className="pay-success">
                <span className="total-info">
                  <p>付款成功</p>
                  <p>￥{this.props.history.location.state.price * this.state.count}</p>
                </span>
              </div>
            </div>
          </div>
          :
          /*this.props.history.push({
              pathname: '/myCenter',
          })&alert('请登陆后进行购买')*/
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
        }
      </div>
    )
  }
}
export default withRouter(PayOrder);