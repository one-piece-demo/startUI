import React from 'react';
import { Col } from 'antd';
import './index.less';

export default props => {
  const { icon, title, children, ...other } = props;
  return (
    <Col md={12} xs={24} className="home__feature" {...other}>
      <img width="80" height="80" src={icon} />
      <h2>{title}</h2>
      <p>{children}</p>
    </Col>
  );
};