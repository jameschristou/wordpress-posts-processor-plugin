import React from 'react';

const ProcessedPostsComponent = (props) => {
  return (
    <div class="processed-posts">
        <table>
            <thead>
                <tr>
                    <th class="num"></th>
                    <th class="post-id">PostId</th>
                    <th class="time-processed">Time Processed</th>
                  </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
  );
}

export default ProcessedPostsComponent;