import React from 'react';

const StartStopComponent = ({isEnabled, isProcessing, startStopProcessingHandler}) => {
  return (
    <div className="start-stop">
        <input id="start-process" className={'start-stop__start button button-primary' + (isProcessing || !isEnabled ? ' disabled' : '')} type="submit" name="start-process" value="Start" onClick={event => startStopProcessingHandler('start')}/>
        <input id="stop-process" className={'button button-primary' + (!isProcessing || !isEnabled ? ' disabled' : '')} type="submit" name="stop-process" value="Stop" onClick={event => startStopProcessingHandler('stop')}/>
    </div>
  );
}

export default StartStopComponent;