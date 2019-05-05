import React from 'react';

const ProcessorSelectorComponent = (props) => {
  return (
    // turn this into a component which displays a drop down of available processors retrieved by API
    <div className="panel file-info">
        <label>Processing Class Name:</label><input id="processing-class-name" type="text" name="processing-class-name" />
    </div>
  );
}

export default ProcessorSelectorComponent;