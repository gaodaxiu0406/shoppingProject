import React from 'react';
import './less/Header.less'

export default class Header extends React.Component{
    constructor(){
        super();
        this.state={title:'标题'};
    }
    render(){
        return (
            <nav id='header' className="mynavbar navbar navbar-inverse navbar-fixed-top">
                <p className=" text-center">{this.props.title}</p>
            </nav>
        )
    }
}