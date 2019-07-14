import React, {useEffect, memo} from 'react';
import ProcessedPostComponent from './ProcessedPostComponent';

const ProcessedPostsBatchComponent = memo(({batchNum, processedPosts, fetchNextSetOfPosts}) => {
  useEffect(() => {
    // the idea is that after we have finished rendering this batch then we should get the next set of posts
    console.log('ProcessedPostsBatchComponent UseEffect called');

    fetchNextSetOfPosts();
  }, []);


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