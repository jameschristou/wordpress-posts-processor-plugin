import React from 'react';

const StartStopComponent = (props) => {
  return (
    <div className="panel">
        <input id="start-process" className="button button-primary" type="submit" name="start-process" value="Start" />
        <input id="stop-process" className="button button-primary disabled" type="submit" name="stop-process" value="Stop" />
    </div>
  );
}

export default StartStopComponent;