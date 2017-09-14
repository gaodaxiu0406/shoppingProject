import React from 'react';
import Sliders from '../components/Sliders';
import HotList from '../components/HotList';
import './less/Home.less';
import Header from '../components/Header';
export default class Home extends React.Component{
  render(){
    return(
      <div>
        <Header title={'首页'}/>
        <Sliders/>
        <p className="text-center text-danger sec-title">热销列表</p>
        <HotList/>
      </div>
    )
  }
}

