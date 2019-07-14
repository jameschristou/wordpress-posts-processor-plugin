import React, {useState, useEffect, useContext, useReducer} from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";
import StatusComponent from './StatusComponent';
import StartStopComponent from './StartStopComponent';
import ProcessedPostsBatchComponent from './ProcessedPostsBatchComponent';

/*
processedPostsBatches structure:
totalRows int
batches [] array of batches
*/

function reducer(state, action) {
  if (action.type === 'FETCHING') {
    // do nothing for now
    return {...state};
  }
  else if (action.type === 'FETCH_SUCCESS') {
    let processedBatches = {...state};

    var currentNumPostsProcessed = processedBatches.totalPostsProcessed;

    let newBatch = [];

    action.processedPosts.forEach((processedPost, index) => {
      newBatch.push({
        rowNum: currentNumPostsProcessed + index + 1,
        postId: processedPost.postId,
        processedDateTime: processedPost.processed
      });
    });

    processedBatches.batches.push(newBatch);
    processedBatches.totalPostsProcessed += newBatch.length;

    return processedBatches;
  } else {
    throw new Error();  
  }
}

const ProcessedPostsComponent = ({processor}) => {
  //const [processedPosts, setProcessedPosts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [processedPostsBatches, dispatch] = useReducer(reducer, { totalPostsProcessed: 0, batches:[] });

  // FETCH_SUCCESS

  // NEW Strategy
  /*
  - Create a new component called ProcessedPostsBatchComponent. It will encapsulate all the items for a single API call
  - Move the reducer outside of the ProcessedPostsComponent so it is available to other components
  - When start is clicked we start creating ProcessedPostsBatchComponents in the map instead of ProcessedPostComponents (keep in mind the key to avoid re-renders!)
  - The important thing will be the useEffect of the ProcessedPostsBatchComponent! It will need to make a call to processNextPosts (which will then call dispatch).
  processNextPosts will live in the parent ProcessedPostsComponent and it will be passed as a prop to ProcessedPostsBatchComponent
  */

  

  /* #region Handlers */
  const startStopProcessingHandler = (val) => {
    console.log('Start/Stop button clicked: ' + val);

    setIsProcessing(val == 'start');

    if(val == 'start'){
      startFetchingPosts();
    }
  };

  const context = useContext(ConfigContext);

  // useEffect(() => {
  //   console.log('UseEffect called');
  //   const process = async () => {
  //     if(!isProcessing) return;
  //     await processNextSetOfPosts();
  //   };

  //   process();
  // }, [isProcessing, processedPosts]);

  const startFetchingPosts = async () => {
    console.log('Calling API to process next set of posts');

    const result = await axios.post(
      `${context.apiBaseUrl}posts-processor/v1/processors?processorName=${processor}`
    );

    dispatch({ type: 'FETCH_SUCCESS', processedPosts: result.data.processedPosts });
  };

  const fetchNextSetOfPosts = async () => {
    if(!isProcessing) return;

    console.log('Calling API to process next set of posts');

    const result = await axios.post(
      `${context.apiBaseUrl}posts-processor/v1/processors?processorName=${processor}`
    );

    dispatch({ type: 'FETCH_SUCCESS', processedPosts: result.data.processedPosts });
  };

  return (
    <React.Fragment>
      <StartStopComponent isEnabled={processor != ''} isProcessing={isProcessing} startStopProcessingHandler={startStopProcessingHandler}/>
      <StatusComponent numPostsProcessed={processedPostsBatches.totalPostsProcessed}/>
      <div className={'processed-posts processed-posts--' + (processedPostsBatches.totalPostsProcessed > 0 ? 'visible' : 'hidden')}>
          <table>
              <thead>
                  <tr>
                    <th className="processed-posts__postnum"></th>
                    <th className="processed-posts__postid">PostId</th>
                    <th className="processed-posts__datetime">Time Processed</th>
                  </tr>
              </thead>
              <tbody>
              {processedPostsBatches.batches.map(
                (processedPostsBatch, index) => {
                  return (
                    <ProcessedPostsBatchComponent
                      key={index}
                      batchNum={index}
                      processedPosts={processedPostsBatch}
                      fetchNextSetOfPosts={fetchNextSetOfPosts}
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