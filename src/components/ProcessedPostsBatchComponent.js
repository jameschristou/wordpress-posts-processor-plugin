import React, {useEffect, useContext, memo} from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";
import ProcessedPostComponent from './ProcessedPostComponent';
import {FETCHING, FETCH_SUCCESS, FINISHED} from './ProcessedPostsReducer.Actions';

const ProcessedPostsBatchComponent = memo(({isProcessing, batchNum, processedPosts, dispatch, processor, batchSize}) => {
  const context = useContext(ConfigContext);

  useEffect(() => {
    // the idea is that after we have finished rendering this batch then we should get the next set of posts
    console.log('ProcessedPostsBatchComponent useEffect called for batch:' + batchNum);

    fetchNextSetOfPosts();
  }, []);

  const fetchNextSetOfPosts = async () => {
    if(!isProcessing) return;

    console.log('Calling API to process posts for batch:' + batchNum);

    const result = await axios.post(
      `${context.apiBaseUrl}posts-processor/v1/processors?processorName=${processor}&batchSize=${batchSize}`
    );

    if(result.data.numProcessedPosts == 0){
      console.log('No more posts available for processing');
      dispatch({type: FINISHED});
    }

    dispatch({ type: FETCH_SUCCESS, processedPosts: result.data.processedPosts });
  };

  console.log("Rendering batch:" + batchNum);

  return (
    <React.Fragment>
      {processedPosts.map(
        p => {
          return (
            <ProcessedPostComponent
              key={p.rowNum}
              post={p}
            />
          );
        }
      )}
    </React.Fragment>
  );
});

export default ProcessedPostsBatchComponent;