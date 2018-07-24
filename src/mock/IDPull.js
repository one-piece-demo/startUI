const Mock = require('mockjs');

const IDPullData = Mock.mock({
  obj: {
    id: '@id',
    name: 'gid',
    value: '@integer(600, 1000)'
  },
  relations: [
    {
      id: '@id',
      name: 'qq',
      value: '@integer(300, 600)',
      distance: '@integer(100, 300)'
    },
    {
      id: '@id',
      name: 'email',
      value: '@integer(250,500)',
      distance: '@integer(100, 200)'
    },
    {
      id: '@id',
      name: 'cell',
      value: '@integer(100, 300)',
      distance: '@integer(20, 80)'
    }
  ]
});

export {
  IDPullData
};