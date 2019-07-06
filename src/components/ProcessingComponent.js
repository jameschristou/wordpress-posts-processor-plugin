import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";
import StatusComponent from './StatusComponent';
import StartStopComponent from './StartStopComponent';
import ProcessedPostsComponent from './ProcessedPostsComponent';

const ProcessingComponent = ({currentlySelectedProcessor}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const context = useContext(ConfigContext);

  /* #region Handlers */
  const startStopProcessingHandler = (val) => {
    console.log('Button clicked: ' + val);

    setIsProcessing(val == 'start');
  };

  /* #endregion */

  return (
    <React.Fragment>
      <StatusComponent />
      <StartStopComponent isEnabled={currentlySelectedProcessor != ''} isProcessing={isProcessing} startStopProcessingHandler={startStopProcessingHandler}/>
      <ProcessedPostsComponent />
    </React.Fragment>
  );
}

export default ProcessingComponent;