import './sass/style.scss';

import './js/index';
import ProcessorSelectorComponent from './js/ProcessorSelectorComponent';
import React from 'react';
import ReactDOM from 'react-dom';

// bootstrap the react application but only after document load (we need the container element to exist)
window.onload = function (){
  const wrapper = document.getElementById("posts-processor-container");
  wrapper ? ReactDOM.render(<ProcessorSelectorComponent />, wrapper) : false;
};