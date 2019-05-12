import React from 'react';

const ProcessedPostsComponent = (props) => {
  return (
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
  );
}

export default ProcessedPostsComponent;