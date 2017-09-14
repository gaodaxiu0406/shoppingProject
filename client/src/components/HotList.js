import React from 'react';
import $ from 'jquery';
import host from './host';
import './less/ProductType.less';
import {withRouter} from "react-router-dom";

class HotList extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  handleClick=(e)=>{
    // console.log(this.props);
    this.props.history.push({
      pathname:'/productdetail/'+e._id,
      state:e
    })
  }
  componentDidMount() {
    $.ajax({
      url: `${host}/product/getHotList`,
      method: 'get',
      dataType: 'json',
      data: null,
      success: (res) => {
        // console.log(res);
        this.setState({
          data: res
        });
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  render() {
    // console.log(this.state.data);
    // console.log(this.props);
    return (
      this.props.location&&this.props.location.pathname=="/products"?
      <ul className="product-type">
        {
          this.state.data.length > 0 ?
          this.state.data.map((item, index) => (
              <li key={index} className="product-list" onClick={()=>{this.handleClick(item)}}>
                  <div className="product-img">
                      <img src={`${host}/productImg/${item.productImg}`} />
                  </div>
                  <div className="product-text">
                      <p className="product-name">{item.productName}</p>
                      <p className="product-describe">{item.describe}</p>
                  </div>
              </li>
          ))
          :
          null
        }
      </ul>
      :
      <ul className="hotList">
        {this.state.data.map((item, index) => (
          <li key={index} className='hot-item' onClick={()=>this.handleClick(item)}>
            <img className='product' src={`${host}/productImg/${item.productImg}`} />
            <p className='product-name'>{item.productName}</p>
            <span className='price'>￥{item.price}元/{item.spec}</span>
          </li>
        ))}
      </ul>
    )
  }
}

export default withRouter(HotList);