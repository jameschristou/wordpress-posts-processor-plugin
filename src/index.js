import './sass/style.scss';

import AppComponent from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';

// bootstrap the react application but only after document load (we need the container element to exist)
window.onload = function (){
  const wrapper = document.getElementById("posts-processor-container");
  wrapper ? ReactDOM.render(<AppComponent />, wrapper) : false;
};