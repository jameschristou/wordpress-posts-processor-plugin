import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";

const StatusComponent = ({numPostsProcessed}) => {
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

  return (
    <div className="panel">
        <span>Posts Remaining: </span><span className="total-remaining">{numPostsProcessed}</span><span>/{totalPosts}</span>
        <div className="progress">
            <span className="status"></span><span className="spinner"><img src='images/spinner.gif' /></span>
        </div>
    </div>
  );
}

export default StatusComponent;