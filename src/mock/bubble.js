import Mock from 'mockjs';

const bubbleData = Mock.mock({
  'data|20': [
    {
      id: '@id',
      name: '@name',
      value: '@integer(10, 100)'
    }
  ]
});

export {
  bubbleData
};