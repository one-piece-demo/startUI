import React from 'react';
import Markdown from 'components/Markdown';
import scaffold from 'md/scaffold.md';

export default () => {
  return <Markdown html={scaffold} />
}
