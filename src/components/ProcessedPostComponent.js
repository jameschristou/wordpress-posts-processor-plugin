import React, {memo} from 'react';

const ProcessedPostComponent = memo(({rowNum, postId, processedDateTime}) => {
  console.log("Rendering row:" + rowNum);

  return (
    <tr><td className="processed-posts__postnum">{rowNum}</td><td className="processed-posts__postid">{postId}</td><td className="processed-posts__datetime">{processedDateTime}</td></tr>
  );
});

export default ProcessedPostComponent;