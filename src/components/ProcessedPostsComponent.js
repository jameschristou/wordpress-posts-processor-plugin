import React, {useState, useEffect, useContext, useReducer, useCallback} from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";
import InfoComponent from './InfoComponent';
import StartStopComponent from './StartStopComponent';
import ProcessedPostsBatchComponent from './ProcessedPostsBatchComponent';
import {FETCHING, FETCH_SUCCESS, FINISHED} from './ProcessedPostsReducer.Actions';

/*
processedPostsBatches structure:
totalRows int
batches [] array of batches
*/



const ProcessedPostsComponent = ({processor, batchSize}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinishedProcessing, setIsFinishedProcessing] = useState(false); // tells us whether all posts have been processed
  const [processedPostsBatches, dispatch] = useReducer(reducer, { totalPostsProcessed: 0, batches:[] });

  const context = useContext(ConfigContext);

  function reducer(state, action) {
    if (action.type === FETCHING) {
      // do nothing for now
      return {...state};
    }
    else if (action.type === FETCH_SUCCESS) {
      let processedBatches = {...state};
  
      var currentNumPostsProcessed = processedBatches.totalPostsProcessed;
  
      let newBatch = [];
  
      action.processedPosts.forEach((processedPost, index) => {
        newBatch.push({
          rowNum: currentNumPostsProcessed + index + 1,
          postId: processedPost.postId,
          processedDateTime: processedPost.processedDateTime,
          data: processedPost.data
        });
      });
  
      processedBatches.batches.push(newBatch);
      processedBatches.totalPostsProcessed += newBatch.length;
  
      return processedBatches;
    } else if(action.type === FINISHED){
      setIsFinishedProcessing(true);
      setIsProcessing(false);
      return {...state};
    } else {
      throw new Error();  
    }
  }

  /* #region Handlers */
  const startStopProcessingHandler = (val) => {
    console.log('Start/Stop button clicked: ' + val);

    setIsProcessing(val == 'start');

    if(val == 'start'){
      startFetchingPosts();
    }
  };

  const startFetchingPosts = async () => {
    console.log('Calling API to process first set of posts');

    const result = await axios.post(
      `${context.apiBaseUrl}posts-processor/v1/processors?processorName=${processor}&batchSize=${batchSize}`
    );

    if(result.data.numProcessedPosts == 0){
      console.log('No posts available for processing');
      dispatch({type: FINISHED});
    }

    dispatch({ type: FETCH_SUCCESS, processedPosts: result.data.processedPosts });
  };

  // pass the dispatch function as a parameter to the Batch component rather than passing the fetchNextSetOfPosts function
  // move fetchNextSetOfPosts to the batch component
  // pass the isProcessing parameter as an extra prop to the batch component
  // the batch component can access the context to get the baseurl
  // this should prevent rerender from occurring

  return (
    <React.Fragment>
      <StartStopComponent isEnabled={processor != '' && !isFinishedProcessing} isProcessing={isProcessing} startStopProcessingHandler={startStopProcessingHandler}/>
      <InfoComponent numPostsProcessed={processedPostsBatches.totalPostsProcessed}/>
      <div className={'processed-posts processed-posts--' + (processedPostsBatches.totalPostsProcessed > 0 ? 'visible' : 'hidden')}>
          <table className="processed-posts__table">
              <thead>
                  <tr>
                    <th className="processed-posts__postnum processed-posts__postnum-heading"></th>
                    <th className="processed-posts__postid processed-posts__postid-heading">PostId</th>
                    <th className="processed-posts__datetime processed-posts__datetime-heading">Time Processed</th>
                    <th className="processed-posts__data processed-posts__data-heading">Data</th>
                  </tr>
              </thead>
              <tbody>
              {processedPostsBatches.batches.map(
                (processedPostsBatch, index) => {
                  return (
                    <ProcessedPostsBatchComponent
                      key={index}
                      isProcessing={isProcessing}
                      batchNum={index}
                      processedPosts={processedPostsBatch}
                      dispatch={dispatch}
                      processor={processor}
                      batchSize={batchSize}
                    />
                  );
                }
              )}
              </tbody>
          </table>
      </div>
    </React.Fragment>
  );
}

export default ProcessedPostsComponent;