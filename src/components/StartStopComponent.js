import React, {useState} from 'react';

const StartStopComponent = (props) => {
  const [state, setState] = useState({ isRunning: false });

  return (
    <div className="panel">
        <input id="start-process" className={'button button-primary' + (state.isRunning ? ' disabled' : '')} type="submit" name="start-process" value="Start" onClick={event => setState({isRunning:true})}/>
        <input id="stop-process" className={'button button-primary' + (state.isRunning ? '' : ' disabled')} type="submit" name="stop-process" value="Stop" onClick={event => setState({isRunning:false})}/>
    </div>
  );
}

export default StartStopComponent;