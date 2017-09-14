import React from 'react';
import $ from 'jquery';
import host from '../components/host';
import './less/OrderDetail.less';
import Header from '../components/Header';
export default class OrderDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: ''
    }
  }
  componentDidMount() {
    // console.log(this.props.history.location.state);
    $.ajax({
      url: host + '/order/orderDetail',
      method: 'get',
      dataType: 'json',
      data: {
        orderNumber: this.props.history.location.state.orderNumber,
        purchaser: JSON.parse(localStorage.getItem('myInfo'))._id
      },
      success: (res) => {
        // console.log(res);
        this.setState({ data: res });
      },
      error: (e) => {
        console.log(e);
      }
    })

  }
  // 数据库返回的是utc时间,和本地时间差8个小时
  formatDate = (createAt) => {
    var date = createAt.split('T')[0];
    var time = createAt.split('T')[1];
    var h = time.split(':')[0] - 0 + 8;
    var m = time.split(':')[1];
    var s = time.split(':')[2].split('.')[0];
    createAt = date + ' ' + h + ' : ' + m + ' : ' + s;
    return createAt
  }
  render() {
    // console.log(this.state.data);
    return (
      <div>
        <Header title={'订单详情'} />
        {
          typeof this.state.data == 'object' && this.state.data.length > 0
            ?
            <ul className="order-detail">
              {
                this.state.data.map((item, index) => (
                  <li key={index} className="order-item">
                    <img src={host + '/productImg/' + item.productImg} />
                    <div className="order-item-text">
                      <p><span>产品名称 : </span> {item.productName}</p>
                      <p><span>订单编号 : </span> {item.orderNumber}</p>
                      <p><span>单价 : </span> {item.price}</p>
                      <p><span>购买数量 : </span> {item.count}</p>
                      <p><span>合计付款 : </span> {item.price * item.count}元</p>
                      <p><span>订单状态 : </span> {item.state == 1 ? "已完成" : item.state == 0 ? "未付款" : "未知"}</p>
                      <p><span>订单创建时间 : </span> {this.formatDate(item.createAt)}</p>
                    </div>
                  </li>
                ))
              }
            </ul>
            :
            <div></div>
        }
      </div>
    )
  }
}