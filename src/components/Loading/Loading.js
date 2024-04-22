import React from 'react';
import './Loading.scss';

const Loading = ({ description }) => {
  return (
    <div className="loading-container">
      <div className="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {description ? <div className="description">{description}</div> : null}
    </div>
  );
};

export default Loading;
