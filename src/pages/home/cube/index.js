import React from 'react';
import classnames from 'classnames';
import './index.less';

export default (props) => {
  const {className} = props;

  return (
    <div className={classnames('cube-box animate', className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};