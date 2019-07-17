import React, {useEffect, useContext, memo} from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";
import ProcessedPostComponent from './ProcessedPostComponent';

const ProcessedPostsBatchComponent = memo(({isProcessing, batchNum, processedPosts, dispatch, processor}) => {
  const context = useContext(ConfigContext);

  useEffect(() => {
    // the idea is that after we have finished rendering this batch then we should get the next set of posts
    console.log('ProcessedPostsBatchComponent UseEffect called for batch:' + batchNum);

    fetchNextSetOfPosts();
  }, []);

  const fetchNextSetOfPosts = async () => {
    if(!isProcessing) return;

    console.log('Calling API to process posts for batch:' + batchNum);

    const result = await axios.post(
      `${context.apiBaseUrl}posts-processor/v1/processors?processorName=${processor}`
    );

    if(result.data.processedPosts.length == 0){
      console.log('No more posts available for processing');
      dispatch({type: 'FINISHED'});
    }

    dispatch({ type: 'FETCH_SUCCESS', processedPosts: result.data.processedPosts });
  };

  console.log("Rendering batch:" + batchNum);

  return (
    <React.Fragment>
      {processedPosts.map(
        ({ rowNum, postId, processedDateTime }) => {
          return (
            <ProcessedPostComponent
              key={rowNum}
              rowNum={rowNum}
              postId={postId}
              processedDateTime={processedDateTime}
            />
          );
        }
      )}
    </React.Fragment>
  );
});

export default ProcessedPostsBatchComponent;