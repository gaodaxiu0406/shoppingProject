import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './less/reset.less';
import './less/nav.less';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Footer from './components/Footer';
import MainBody from './components/MainBody';
ReactDOM.render(
    <div>
        <MainBody />
        <Footer />
    </div>
    , document.getElementById('root')
)