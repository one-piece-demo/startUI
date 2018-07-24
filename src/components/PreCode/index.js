import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import beautify from 'code-beautify';
import './index.less';

const PreCode = props => {
  const { className, lang, theme, transparent, children } = props;
  const code = beautify(children, lang || 'js');
  return (
    <pre
      className={classnames('pre', { 'pre--transparent': transparent, 'pre-dark': theme!== 'light', 'pre-light': theme == 'light'  }, className)}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
};

PreCode.propTypes = {
  // 代码所属语言， https://github.com/jianghai/code-beautify
  lang: PropTypes.string,
  // 主题， 默认黑色背景 ； 目前有两种主题：dark/light
  theme: PropTypes.string,
  // 背景色是否透明
  transparent: PropTypes.bool
};

export default PreCode;