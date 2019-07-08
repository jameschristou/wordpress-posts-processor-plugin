import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";
import StatusComponent from './StatusComponent';

//export default processingPostsReducer;

const ProcessedPostsComponent = ({processor, isProcessing}) => {
  const [processedPosts, setProcessedPosts] = useState([]);

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
    
    // clone the current state (initial state)...state is immutable so can't modify it directly
    let posts = [...processedPosts];

    // result.data.processors.forEach(processor => {
    //   posts.push({value: processor, name: processor});
    // })

    setProcessedPosts(posts);

    console.log('Posts:' + posts);
  };

  if (processedPosts.length == 0) return <div className="processed-posts"></div>;

  return (
    <React.Fragment>
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