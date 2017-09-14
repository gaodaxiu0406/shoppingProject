import React from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import host from '../components/host';
import './less/OrderType.less';
class OrderType extends React.Component {
  constructor() {
    super();
    this.state = {
      myInfo: JSON.parse(localStorage.getItem('myInfo')),
      data: []
    }
  }
  ajax = (data) => {
    $.ajax({
      url: host + '/order/getOrderList',
      method: 'get',
      dataType: 'json',
      data: data,
      success: (res) => {
        //console.log(res);
        this.setState({ data: res })
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  componentDidMount() {
    // 如果登录了,请求登录用户的订单列表
    // 如果传了ordertype表示的是请求已付款和未付款的订单,如果没传请求的是全部订单
    if (localStorage.getItem('myInfo')) {// 有登录信息
      if (this.props.location.query) {
        this.ajax({
          purchaser: this.state.myInfo._id,
          ordertype: this.props.location.query.ordertype
        })
      } else {
        this.ajax({
          purchaser: this.state.myInfo._id
        })
      }
    }
  }

  // 删除订单
  clickDelete = (e, index) => {
    // console.log(e.orderNumber);
    // console.log(this.state.myInfo._id);
    console.log(index);

    $.ajax({
      url: host + '/order/deleteOrder',
      method: 'get',
      dataType: 'json',
      data: {
        purchaser: this.state.myInfo._id,
        orderNumber: e.orderNumber
      },
      success: (res) => {
        console.log(res);
        if (res.code == 1) {
          // e.target.parentNode
          $('.order-item').eq(index).hide(200);
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  // 跳转到付款页面
  handlePay = (e) => {
    // 要把订单号传过去
    // console.log(e);
    // console.log(e.orderNumber);        
    this.props.history.push({
      pathname: '/payorder',
      state: e
    })
  }

  // 跳转到订单详情页面
  clickToOrderdetail = (e) => {
    // console.log(e.orderNumber);
    let orderNumber = e.orderNumber;
    this.props.history.push({
      pathname: '/orderdetail/' + orderNumber,
      state: { orderNumber }
    })
  }
  render() {
    return (
      <ul className="order-list">
        {
          this.state.data.length > 0
            ?
            this.state.data.map((item, index) => (
              <li className="order-item" key={index}>
                <div className="order-item-count">
                  <span className="pull-left order-item-number">订单编号: {item.orderNumber}</span>
                  <span className="pull-right order-item-count-1">共计{item.count}件商品</span>
                </div>
                <div className="order-item-detail" onClick={() => this.clickToOrderdetail(item)}>
                  <div className="order-item-img">
                    <img src={host + '/productImg/' + item.productImg} />
                  </div>
                  <div className="order-item-productinfo">
                    <p className="order-item-name">{item.productName}</p>
                    <p className="order-item-describe">{item.describe}</p>
                  </div>
                  <div className="order-item-payinfo">
                    <p className="order-item-totalpay">￥{item.price * item.count}</p>
                    {item.state == 0 ? (<p className="order-item-state unpay">待支付</p>) : item.state == 1 ? (<p className="order-item-state completed">交易完成</p>) : null}
                  </div>
                </div>
                <div className="order-item-btn">
                  <span className="btn-order-delete btn btn-danger pull-right" onClick={() => this.clickDelete(item, index)}>删除订单</span>
                  {item.state == 0 ? (<span className="order-item-state btn btn-info paynow" onClick={() => this.handlePay(item)}>立即支付</span>) : null}
                </div>
              </li>
            ))
            :
            <li className="order-item-empty" >
              订单列表为空
            </li>
        }
      </ul>
    )
  }
}
export default withRouter(OrderType);