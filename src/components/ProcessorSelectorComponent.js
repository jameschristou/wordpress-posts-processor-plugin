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
        `${context.apiBaseUrl}posts-processor/v1/init-data`,
      );
      
      // clone the current state (initial state)...state is immutable so can't modify it directly
      let options = [...processorListOptions];

      result.data.processors.forEach(processor => {
        options.push({value: processor.name, name: processor.name});
      })

      setProcessorListOptions(options);
    };

    fetchData();
  }, []);

  return (
    <div className="processor-selector">
        <label className="processor-selector__label">Processor</label>
        <select className="processor-selector__dropdown" id="processor-name" type="text" name="processor-name" onChange={processorSelectedHandler}>
          {processorListOptions.map((option) =>
              <option value={option.value} key={option.value}>{option.name}</option>
          )}
        </select>
    </div>
  );
}

export default ProcessorSelectorComponent;