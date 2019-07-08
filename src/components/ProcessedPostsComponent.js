import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";
import StatusComponent from './StatusComponent';
import StartStopComponent from './StartStopComponent';

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

    result.data.processedPosts.forEach(processedPost => {
      posts.push({postId: processedPost.postId, processedDateTime: processedPost.processed});
    })

    setProcessedPosts(posts);
  };

  return (
    <React.Fragment>
      <StartStopComponent isEnabled={processor != ''} isProcessing={isProcessing} startStopProcessingHandler={startStopProcessingHandler}/>
      <StatusComponent />
      <div className="processed-posts">
          <table>
              <thead>
                  <tr>
                      <th className="num"></th>
                      <th className="post-id">PostId</th>
                      <th className="time-processed">Time Processed</th>
                    </tr>
              </thead>
              <tbody>
              </tbody>
          </table>
      </div>
    </React.Fragment>
  );
}

export default ProcessedPostsComponent;