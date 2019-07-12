import React from 'react';

const ProcessedPostComponent = ({rowNum, postId, processedDateTime}) => {
  console.log("Rendering row:" + rowNum);

  return (
    <tr><td>{rowNum}</td><td>{postId}</td><td>{processedDateTime}</td></tr>
  );
}

export default ProcessedPostComponent;