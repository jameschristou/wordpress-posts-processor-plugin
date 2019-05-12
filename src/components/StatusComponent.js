import React from 'react';

const StatusComponent = (props) => {
  return (
    <div className="panel">
        <span>Posts Remaining: </span><span className="total-remaining">10</span><span>/20</span>
        <div className="progress">
            <span className="status"></span><span className="spinner"><img src='images/spinner.gif' /></span>
        </div>
    </div>
  );
}

export default StatusComponent;