import React, {useState} from 'react';

const ProcessorSelectorComponent = (props) => {
  // use array destructuring to get the getState function (we don't need a function to set state since we only do that once on component load)
  const [getState] = useState(
    // initiliase the state...will need to turn this into an api call to initialise the state
    [
      {'value': 'default', 'name': 'Choose a Processor'},
      {'value': 'donothing', 'name': 'Do Nothing'}
    ]
  );

  return (
    <div className="panel file-info">
        <label>Processor</label>
        <select id="processor-name" type="text" name="processor-name">
          {getState.map((option) =>
              <option key={option.value}>{option.name}</option>
          )}
        </select>
    </div>
  );
}

export default ProcessorSelectorComponent;