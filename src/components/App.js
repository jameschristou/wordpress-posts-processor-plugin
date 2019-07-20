import React, {useState, useReducer} from 'react';
import ProcessorSelectorComponent from './ProcessorSelectorComponent';
import ProcessedPostsComponent from './ProcessedPostsComponent';
import BatchSizeComponent from './BatchSizeComponent';

export const ConfigContext = React.createContext();

const configValue = {
  apiBaseUrl: '/wp-json/'
};

const AppComponent = (props) => {
  const [currentProcessor, setProcessor] = useState('');
  const [batchSize, dispatch] = useReducer(reducer, 10);

  function reducer(state, action) {
    if (action.type === 'BATCH_SIZE_CHANGED') {
      console.log('Batch size changed');
      return action.batchSize;
    }
    else {
      throw new Error();  
    }
  }

  /* #region Handlers */
  const processorSelectedHandler = (e) => {
    e.preventDefault();

    console.log('Processor changed: ' + e.target.value);

    setProcessor(e.target.value == "default" ? "" : e.target.value);
  };

  /* #endregion */

  return (
    <div className="posts-processor-app">
      <ConfigContext.Provider value={configValue} >
        <ProcessorSelectorComponent processorSelectedHandler={processorSelectedHandler}/>
        <BatchSizeComponent batchSize={batchSize} dispatch={dispatch}/>
        <ProcessedPostsComponent processor={currentProcessor}/>
      </ConfigContext.Provider>
    </div>
  );
}

export default AppComponent;