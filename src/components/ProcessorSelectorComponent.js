import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ConfigContext } from "./App";

const ProcessorSelectorComponent = ({processorSelectedHandler}) => {
  const [processorListOptions, setProcessorListOptions] = useState([{'value': 'default', 'name': 'Choose a Processor'}]);

  const context = useContext(ConfigContext);

  // initialise state. This code will only run when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${context.apiBaseUrl}posts-processor/v1/processors`,
      );
      
      // clone the current state (initial state)...state is immutable so can't modify it directly
      let options = [...processorListOptions];

      result.data.processors.forEach(processor => {
        options.push({value: processor, name: processor});
      })

      setProcessorListOptions(options);
    };

    fetchData();
  }, []);

  return (
    <div className="panel file-info">
        <label>Processor</label>
        <select id="processor-name" type="text" name="processor-name" onChange={processorSelectedHandler}>
          {processorListOptions.map((option) =>
              <option value={option.value} key={option.value}>{option.name}</option>
          )}
        </select>
    </div>
  );
}

export default ProcessorSelectorComponent;