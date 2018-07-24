import React from 'react';
import Markdown from 'components/Markdown';
import log from 'md/log.md';

export default () => {
  return <Markdown html={log} />
}
