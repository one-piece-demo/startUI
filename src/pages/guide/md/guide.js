import React from 'react';
import Markdown from 'components/Markdown';
import guide from 'md/guide.md';

export default () => {
  return <Markdown html={guide} />
}
