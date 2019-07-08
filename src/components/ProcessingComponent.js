import React, {useState} from 'react';
import StartStopComponent from './StartStopComponent';
import ProcessedPostsComponent from './ProcessedPostsComponent';

const ProcessingComponent = ({currentlySelectedProcessor}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  /* #region Handlers */
  const startStopProcessingHandler = (val) => {
    console.log('Button clicked: ' + val);

    setIsProcessing(val == 'start');
  };

  /* #endregion */

  return (
    <React.Fragment>
      <StartStopComponent isEnabled={currentlySelectedProcessor != ''} isProcessing={isProcessing} startStopProcessingHandler={startStopProcessingHandler}/>
      <ProcessedPostsComponent isProcessing={isProcessing} processor={currentlySelectedProcessor}/>
    </React.Fragment>
  );
}

export default ProcessingComponent;