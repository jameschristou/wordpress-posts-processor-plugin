import React from 'react';
import ProcessorSelectorComponent from './ProcessorSelectorComponent';
import StatusComponent from './StatusComponent';
import StartStopComponent from './StartStopComponent';
import ProcessedPostsComponent from './ProcessedPostsComponent';

const AppComponent = (props) => {
  return (
    <div className="posts-processor-app">
        <ProcessorSelectorComponent />
        <StatusComponent />
        <StartStopComponent />
        <ProcessedPostsComponent />
    </div>
  );
}

export default AppComponent;