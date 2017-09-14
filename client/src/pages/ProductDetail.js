import React from 'react';
import host from '../components/host';
import '../pages/less/ProductDetail.less';
import Header from '../components/Header';

export default class ProductDetail extends React.Component{
    constructor(){
        super();
        this.state={data:{}};
    }
    componentDidMount(){
        this.setState({
            data:this.props.history.location.state//把上一页传过来的产品数据保存到当前组件的state中
        })
    }
    btnClick=()=>{
        // console.log(this.state.data);
        this.props.history.push({
            pathname:"/payorder",
            state:this.state.data
        })
    }
    render(){
        // console.log(this.props.history.location.state);
        return(
            <div className="product-detail">
                <Header title={'特产详情'}/>
                <div className="product-img">
                    {
                        <img src={host+'/productImg/'+this.props.history.location.state.productImg}/>
                    }
                </div>
                <div className="product-name-price">
                    <span className="product-name">{this.props.history.location.state.productName}</span>
                    <span className="product-price">
                        {'￥'+this.props.history.location.state.price+'元/'+this.props.history.location.state.spec}
                        <span className="price-sale">&nbsp;促销产品&nbsp;</span>
                    </span>
                </div>
                <p className="product-describe">
                     {this.props.history.location.state.describe}
                </p>
                <div className="address">配送地址</div>
                <div className="address-detail">
                    北京市昌平区回龙观东大街
                </div>
                <div className="buy" onClick={this.btnClick}>
                   <span>立即购买</span>
                </div>
            </div>
        )
    }
}