import React from 'react';
import ProcessorSelectorComponent from './ProcessorSelectorComponent';
import StatusComponent from './StatusComponent';
import StartStopComponent from './StartStopComponent';
import ProcessedPostsComponent from './ProcessedPostsComponent';

export const ConfigContext = React.createContext();

const configValue = {
  apiBaseUrl: 'http://localhost:8100/wp-json/'
};

const AppComponent = (props) => {
  return (
    <div className="posts-processor-app">
      <ConfigContext.Provider value={configValue} >
        <ProcessorSelectorComponent />
        <StatusComponent />
        <StartStopComponent />
        <ProcessedPostsComponent />
      </ConfigContext.Provider>
    </div>
  );
}

export default AppComponent;