import React,{Fragment} from 'react';
import spinner from '../bgimg/loading.gif';
export default ()=>(
    <Fragment>
    <div className="h-100vh d-flex justify-content-center align-items-center">
      <img
        src={spinner}
        style={{ width: '50px' }}
        alt="Loading..."
      />
    </div>
  </Fragment>
);

