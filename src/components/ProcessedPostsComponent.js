import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";
import StatusComponent from './StatusComponent';
import StartStopComponent from './StartStopComponent';
import ProcessedPostComponent from './ProcessedPostComponent';

const ProcessedPostsComponent = ({processor}) => {
  const [processedPosts, setProcessedPosts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  /* #region Handlers */
  const startStopProcessingHandler = (val) => {
    console.log('Button clicked: ' + val);

    setIsProcessing(val == 'start');
  };

  const context = useContext(ConfigContext);

  useEffect(() => {
    console.log('UseEffect called');
    const process = async () => {
      if(!isProcessing) return;
      await processNextSetOfPosts();
    };

    process();
  }, [isProcessing, processedPosts]);

  const processNextSetOfPosts = async () => {
    console.log('Calling API to process next set of posts');

    const result = await axios.post(
      `${context.apiBaseUrl}posts-processor/v1/processors?processorName=${processor}`
    );

    if(result.data.processedPosts.length == 0){
      console.log('No more posts to process');
      setIsProcessing(false);
      return;
    }
    
    // clone the current state (initial state)...state is immutable so can't modify it directly
    let posts = [...processedPosts];

    var currentNumPostsProcessed = posts.length;

    result.data.processedPosts.forEach((processedPost, index) => {
      posts.push({
        rowNum: currentNumPostsProcessed + index + 1,
        postId: processedPost.postId,
        processedDateTime: processedPost.processed
      });
    })

    setProcessedPosts(posts);
  };

  return (
    <React.Fragment>
      <StartStopComponent isEnabled={processor != ''} isProcessing={isProcessing} startStopProcessingHandler={startStopProcessingHandler}/>
      <StatusComponent numPostsProcessed={processedPosts.length}/>
      <div className={'processed-posts processed-posts--' + (processedPosts.length > 0 ? 'visible' : 'hidden')}>
          <table>
              <thead>
                  <tr>
                    <th className="processed-posts__postnum"></th>
                    <th className="processed-posts__postid">PostId</th>
                    <th className="processed-posts__datetime">Time Processed</th>
                  </tr>
              </thead>
              <tbody>
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
              </tbody>
          </table>
      </div>
    </React.Fragment>
  );
}

export default ProcessedPostsComponent;