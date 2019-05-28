import React, {useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const processorSelectedReducer = (state, action) => {
  switch (action) {
    case 'PROCESSOR_SELECTED':
      console.log('PROCESSOR_SELECTED action');
      return 'PROCESSOR_IS_SELECTED';
    case 'NO_PROCESSOR_SELECTED':
      console.log('NO_PROCESSOR_SELECTED action');
      return 'PROCESSOR_NOT_SELECTED';
    default:
      throw new Error();
  }
};

const ProcessorSelectorComponent = (props) => {
  // use array destructuring to get the getState function (we don't need a function to set state since we only do that once on component load)
  const [state, setState] = useState([{'value': 'default', 'name': 'Choose a Processor'}]);
  const [processorSelectedState, dispatchProcessorSelected] = useReducer(processorSelectedReducer, 'NO_PROCESSOR_SELECTED');

  // initialise state. This code will only run when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8100/wp-json/posts-processor/v1/processors',
      );
      
      // clone the current state (initial state)...state is immutable so can't modify it directly
      let options = [...state];

      result.data.processors.forEach(processor => {
        options.push({value: processor, name: processor});
      })

      setState(options);
    };

    fetchData();
  }, []);

  const handleProcessorSelection = () => {
    if(true){
      dispatchProcessorSelected('PROCESSOR_SELECTED');
      return;
    }

    dispatchProcessorSelected('NO_PROCESSOR_SELECTED');
  };

  return (
    <div className="panel file-info">
        <label>Processor</label>
        <select id="processor-name" type="text" name="processor-name" onChange={handleProcessorSelection}>
          {state.map((option) =>
              <option key={option.value}>{option.name}</option>
          )}
        </select>
    </div>
  );
}

export default ProcessorSelectorComponent;