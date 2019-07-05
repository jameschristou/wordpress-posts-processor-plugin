import React, {useState} from 'react';
import ProcessorSelectorComponent from './ProcessorSelectorComponent';
import StatusComponent from './StatusComponent';
import StartStopComponent from './StartStopComponent';
import ProcessedPostsComponent from './ProcessedPostsComponent';

export const ConfigContext = React.createContext();

const configValue = {
  apiBaseUrl: 'http://localhost:8100/wp-json/'
};

const AppComponent = (props) => {
  const [currentProcessor, setProcessor] = useState('');

  /* #region Main */
  const processorSelectedHandler = (e, favoriteValue) => {
    e.preventDefault();
    // const sessionId = parseInt(e.target.attributes["data-sessionid"].value);
    // dispatch({
    //   type: favoriteValue === true ? "favorite" : "unfavorite",
    //   sessionId
    // });
    console.log('Processor changed');
  };

  /* #endregion */

  return (
    <div className="posts-processor-app">
      <ConfigContext.Provider value={configValue} >
        <ProcessorSelectorComponent processorSelectedHandler={processorSelectedHandler}/>
        <StatusComponent />
        <StartStopComponent />
        <ProcessedPostsComponent />
      </ConfigContext.Provider>
    </div>
  );
}

export default AppComponent;