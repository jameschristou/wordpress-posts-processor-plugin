import React from 'react';

const ProcessedPostComponent = ({postNum, postId, processedDateTime}) => {
  return (
    <tr><td>{postNum}</td><td>{postId}</td><td>{processedDateTime}</td></tr>
  );
}

export default ProcessedPostComponent;