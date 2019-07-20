import React, {memo} from 'react';

const BatchSizeComponent = memo(({batchSize, dispatch}) => {
  const batchSizeChangedHandler = (val) => {
    console.log('Batch size changed: ' + val);

    dispatch({ type: 'BATCH_SIZE_CHANGED', batchSize: val });
  };

  return (
    <div className='batch-size'>
      <label className='batch-size__label'>Batch Size</label>
      <input className='batch-size__input'
          type="text"
          value={batchSize}
          onChange={e => batchSizeChangedHandler(e.target.value)}
        />
    </div>
  );
});

export default BatchSizeComponent;