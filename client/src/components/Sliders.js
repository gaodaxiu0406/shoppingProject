import React from 'react'
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
import './less/Sliders.less';
let images=[
    {src:require('../img/1.jpg')},
    {src:require('../img/2.jpg')},
    {src:require('../img/3.jpg')},
];
export default class Sliders extends React.Component {
    constructor(){
        super();
        this.state={index:0};
    }
    render() {
        let options={
            continuous: true,
            auto:3000,
            disableScroll:true,
            speed:400,
            callback:(index)=>{
                this.setState({
                    index 
                });
            }
        };
        return (
            <div className="sliders">
                <ReactSwipe swipeOptions={options}>
                    {images.map((item,index)=>(
                        <div className="slider" key={index}>
                            <img src={item.src} alt=""/>
                        </div>
                    ))}
                </ReactSwipe>
                <ul className="dots">
                    {images.map((item,index)=>(
                        <li className={this.state.index==index?"active":""} key={index}></li>
                    ))}
                </ul>
            </div>
        );
    }
}
