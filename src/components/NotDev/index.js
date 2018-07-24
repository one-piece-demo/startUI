import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import classnames from 'classnames';
import './index.less';

const NotDev = (props) => {
  const {className, top, children, ...other} = props;
  const topVal = top || 120;
  return (
    <div className={classnames('not-dev', className)} {...other} style={{paddingTop: topVal + 'px'}}>
      <h1>
        <Icon type='meh-o'/>
      </h1>
      <p className='not-dev-info'>您访问的页面暂未开发，敬请期待！&nbsp;<Icon type='smile-o'/></p>
      <div className='not-dev-children'>
        {children}
      </div>
    </div>
  );
};

NotDev.propTypes = {
  // defaultProps, 距容器padding-top值, 默认 120
  top: PropTypes.number
}

export default NotDev;