import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";

const InfoComponent = ({numPostsProcessed}) => {
  const [totalPosts, setTotalPosts] = useState(0);

  const context = useContext(ConfigContext);

  // initialise state. This code will only run when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${context.apiBaseUrl}posts-processor/v1/posts-to-process/`,
      );
      
      setTotalPosts(result.data.totalPosts);
    };

    fetchData();
  }, []);

  if(numPostsProcessed == 0){
    return (
      <TotalToProcessComponent totalPosts={totalPosts} />
    );
  }

  return (
    <ProcessingStatsComponent totalPosts={totalPosts} numPostsProcessed={numPostsProcessed} />
  );
}

const ProcessingStatsComponent = ({totalPosts, numPostsProcessed}) => {
  return (
    <div className="info">
      <div className="info__processing-stats">
        <span>Total processed: </span><span>{numPostsProcessed}</span><span>/{totalPosts}</span>
      </div>
      <div className="info__processing-stats">
        <span>Processing rate: </span><span>TBD</span>
      </div>
    </div>
  );
}

const TotalToProcessComponent = ({totalPosts}) => {
  return (
    <div className="info info__total-to-process">
        <span>Total posts to process: {totalPosts}</span>
    </div>
  );
}

export default InfoComponent;