/**
 * DEMO、文档生成器，以 webpack loader 的方式动态编译
 * https://webpack.github.io/docs/how-to-write-a-loader.html
 * 
 * doc 模板注意： const  import 关键词
 * components 注意： proptypes  public 关键词
 */

 'user strict';

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const beautify = require('code-beautify');

// 代码高亮
marked.setOptions({
  highlight: (code, lang) => beautify(code, lang)
});

// 智能添加依赖，自动规避重复声明
const imports = {

  list: [],

  variables: [],

  add(item) {
    const match = item.match(/import (.*?) from(.*)/);
    if (match) {
      const variables = match[1].split(/,|\{|\}/).map(v => v.trim());
      let hasNewVariate = false;
      variables.forEach(v => {
        if (!v) return;
        if (imports.variables.indexOf(v) === -1) {
          hasNewVariate = true;
          imports.variables.push(v);
        } else {
          match[1] = match[1].replace(new RegExp(`\\b${v}\\b`), ''); // 替换整串单词
        }
      });
      if (hasNewVariate) {
        match[1] = match[1].replace(/^\s*,|\{\s*,|,\s*\}/g, '');
        imports.list.push(`import ${match[1]} from${match[2]}`);
      }
    }
  },

  getAll() {
    return imports.list;
  },

  reset() {
    imports.list = [];
    imports.variables = [];
  }
};

module.exports = function (source) {
  this.cacheable(); // 可缓存

  imports.reset();

  // 依赖的公共模块
  imports.add(`import React, { Component } from 'react'`);
  imports.add(`import { Row, Col } from 'antd'`);
  imports.add(`import Demo from 'public/Demo'`);
  imports.add(`import Doc from 'public/Doc'`);

  // 获取 DEMO、文档数据
  const demos = [];
  const docs = [];

  const callbacks = [
    match => {
      demos.push({
        title: match
      });
    },
    match => {
      demos[demos.length - 1].desc = match;
    },
    match => {
      demos[demos.length - 1].link = match.trim();
    },
    match => {
      const currentDemo = demos[demos.length - 1]; // 添加 属性 code 、 mainCode 、 name ，及add import
      currentDemo.code = match.trim();
      const _imports = match.match(/import .*/g);
      if (_imports) {
        _imports.forEach(item => {
          imports.add(item.trim());
        });
        currentDemo.mainCode = currentDemo.code.replace(/import .*/g, '').trim();
      }
      currentDemo.name = currentDemo.mainCode.match(/(?:const|class)\s(\w+)/)[1];
    },
    match => {
      // 文档
      const doc = {
        name: match.split('/').slice(-1)[0],
        defaultProps: {},
        props: [],
        apis: []
      };

      let dir = path.join(__dirname, '../src/components/' + match);
      try {
        if (fs.statSync(dir).isDirectory()) { // 判断是否是目录
          dir += '/index.js';
        } else {
          dir += '.js';
        }
      } catch(e) {
        dir += '.js';
      }
      
      const sourceCode = fs.readFileSync(dir, 'utf8');
      
      // 组件 defaultProps
      // match = sourceCode.match(/\.defaultProps = ({[^]+?\n\})/)
      // if (match) {
      //   console.log(match[1])
      //   doc.defaultProps = new Function('return ' + match[1])()
      //   console.log(doc.defaultProps)
      // }
  
      // 组件 props
      match = sourceCode.match(/\.propTypes = ({[^]+?\n\})/);
      if (match) {
        match = match[1];
        const reg = /(\/\/|\/\*\*)([^]+?)(\w+):\s*.*?PropTypes(.*)/g;
        let res;
        while (res = reg.exec(match)) {
          let desc = res[2] || '';
          if (desc) {
            desc = desc.trim().replace(/\*\/$/, '');
            desc = marked(desc.replace(/\r?\n?\s*\*\s?/g, '\r\n').trim());
          }
          let type = res[4].match(/string|bool|number|object|array|func|node|element|oneOf.*/g)[0];
          if (type.indexOf('oneOfType') === 0) {
            type = type.match(/PropTypes\.\w+/g).join(' | ').replace(/PropTypes\./g, '');
          } else if (type.indexOf('oneOf') === 0) {
            type = new Function('return ' + type.match(/\[.*?]/)[0] + '.join(" | ")')();
          }
          doc.props.push({
            name: res[3],
            desc: desc,
            type: type,
            required: !!res[4].match(/isRequired/)
          });
        }
      }
  
      // API、组件对外的方法, @public
      const apiReg = /\* @public([^]+?)\*\//g;
      while(match = apiReg.exec(sourceCode)) {
        match = match[1];
        const api = {};
        const handleMap = {
          name: res => {
            api.name = res;
          },
          type: res => {
            api.type = res;
          },
          description: res => {
            api.desc = marked(res.replace(/\r?\n?\s*\*\s?/g, '\r\n').trim());
          },
          param: res => {
            let param;
            res = res.match(/(.*?\})\s*([\w[\]]+)\s+([^]*)/);
            if (res) {
              param = {
                type: res[1],
                name: res[2],
                desc: marked(res[3].replace(/\r?\n?\s*\*\s?/g, '\r\n').trim())
              };
            }
            param && (api.params || (api.params = [])).push(param);
          },
          'return': res => {
            res = res.match(/(.*?\})\s*(.*)/);
            api.return = {
              type: res[1],
              desc: res[2].trim()
            };
          }
        };
        const reg = /([a-z]+)\s+([^]*)/;
        match = match.split(/(\r?\n?) \* @/).slice(1);
        match.forEach(v => {
          v = v.match(reg);
          v && handleMap[v[1]] && handleMap[v[1]](v[2]);
        });
        doc.apis.push(api);
      }
  
      docs.push(doc);
    }
  ];

  // 处理doc模块, @title、@desc、code、@component、@link
  const reg = /@title\s(.+)|@desc\s(.+)|@link\s(.+)|(\nimport [^]+?\n})|@component\s(.+)/g;
  source.replace(reg, (match, p1, p2, p3, p4, p5) => {
    [p1, p2, p3, p4, p5].forEach((match, i) => {
      match && callbacks[i](match);
    });
  });

  // 提前声明
  const codes = demos.map(demo => {
    const code = demo.code.replace(/`/g, '\\\`').replace(/\$\{/g, '\\\${');
    return `const code${demo.name} = \`${code}\`
    ${demo.mainCode}`;
  });

  // 生成布局代码
  const leftCol = [];
  const rightCol = [];
  demos.forEach((demo, i) => {
    const code = (`
      <Demo title="${demo.title}" code={code${demo.name}} desc="${demo.desc || ''}" link="${demo.link || ''}">
        <${demo.name} />
      </Demo>
    `);
    i % 2 === 0 ? leftCol.push(code) : rightCol.push(code);
  });

  let layout;
  if (rightCol.length) {
    layout = (`
      <Row gutter={8}>
        <Col md={12} xs={24}>${leftCol.join('\r\n')}</Col>
        <Col md={12} xs={24}>${rightCol.join('\r\n')}</Col>
      </Row>
    `);
  } else {
    layout = leftCol[0];
  }

  // 生成文档代码
  const componentsDocs = docs.map(doc => {
    return `<Doc key="${doc.name}" {...${doc}} />`;
  });

  return `${imports.getAll().join('\r\n')}

  ${codes.join('\r\n')}

  const docs = ${JSON.stringify(docs)}

  export default () => {
    return (
      <div>
        ${layout}
        {docs.map(doc => <Doc key={doc.name} {...doc} />)}
      </div>
    )
  }`;
};