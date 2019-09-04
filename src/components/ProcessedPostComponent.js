import React, {memo} from 'react';

const ProcessedPostComponent = memo(({post}) => {
  console.log("Rendering row:" + post.rowNum);

  return (
    <tr><td className="processed-posts__postnum">{post.rowNum}</td><td className="processed-posts__postid">{post.postId}</td><td className="processed-posts__datetime">{post.processedDateTime}</td></tr>
  );
});

export default ProcessedPostComponent;