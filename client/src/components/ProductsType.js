import React from 'react';
import $ from 'jquery';
import host from '../components/host';
import './less/ProductType.less';
import { withRouter } from "react-router-dom";
class ProductType extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    handleClick = (e) => {
        // console.log(e);
        // console.log(this.props);
        this.props.history.push({
            pathname: '/productdetail/' + e._id,
            state: e
        })
    }
    componentDidMount() {
        if (this.props.location.query)
            $.ajax({
                url: host + "/product/productList",
                method: 'get',
                dataType: "json",
                data: { type: this.props.location.query.type },
                success: (res) => {
                    this.setState({ data: res });
                    // console.log(this.state.data);
                },
                error: (e) => {
                    console.log(e);
                }
            })
    }

    render() {
        // console.log(this.state.data);
        return (
            <ul className="product-type">
                {
                    this.state.data.length > 0 ?
                        this.state.data.map((item, index) => (
                            <li key={index} className="product-list" onClick={() => this.handleClick(item)}>
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
                        <li className="empty-list product-list"> 列表为空 </li>
                }
            </ul>
        )
    }
}
export default withRouter(ProductType);