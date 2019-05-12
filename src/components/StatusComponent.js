import React from 'react';

const StatusComponent = (props) => {
  return (
    <div className="panel">
        <span>Posts Remaining: </span><span class="total-remaining">10</span><span>/20</span>
        <div class="progress">
            <span class="status"></span><span class="spinner"><img src='images/spinner.gif' /></span>
        </div>
    </div>
  );
}

export default StatusComponent;