import React from 'react';

const StartStopComponent = (props) => {
  return (
    <div class="panel">
        <input id="start-process" class="button button-primary" type="submit" name="start-process" value="Start" />
        <input id="stop-process" class="button button-primary disabled" type="submit" name="stop-process" value="Stop" />
    </div>
  );
}

export default StartStopComponent;