import React, {useState} from 'react';
import ProcessorSelectorComponent from './ProcessorSelectorComponent';
import ProcessingComponent from './ProcessingComponent';

export const ConfigContext = React.createContext();

const configValue = {
  apiBaseUrl: 'http://localhost:8100/wp-json/'
};

const AppComponent = (props) => {
  const [currentProcessor, setProcessor] = useState('');

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
        <ProcessingComponent currentlySelectedProcessor={currentProcessor}/>
      </ConfigContext.Provider>
    </div>
  );
}

export default AppComponent;