import React from 'react';
import {Link} from 'react-router';
import { Row, Col} from 'antd';
import PreCode from 'components/PreCode';
import Cube from './cube/';
import Feature from './Feature';
import './index.less';

import img1 from 'public/imgs/feature_0.png';
import img2 from 'public/imgs/feature_1.png';
import img3 from 'public/imgs/feature_2.png';
import img4 from 'public/imgs/feature_3.png';

const code = `import EchartsChart from 'components/EchartsChart'

class App extends Component {
  state = {
    options: {}
  }

  render() {
    return <EchartsChart options={this.state.options} type='pie' />
  }
}

export default App`;

export default () => {
  return (
    <div className='home'>
      <div className="home-banner">
        <div className="home-banner-pendant pendant-lg"></div>
        <div className="home-banner-pendant pendant-sm"></div>
        <div className="home-banner-content">
          <Row gutter={16}>
            <Col md={16} xs={24} className='home__banner-center'>
              <h2>Star UI —— 企业级 React 组件库</h2>
              <h1>UI•星界征信</h1>
              <em>文档版本：v0.x</em>
              <Link to="/guide" className="home__banner-btn">
                开发安装
              </Link>
              <Link to="/views" className="home__banner-btn">
                组件指南
              </Link>
            </Col>
            <Col md={8} xs={24}>
              <PreCode className="home-middle-code">{code}</PreCode>
            </Col>
          </Row>
        </div>
      </div>
      <div className="home-features">
        <div className="home-cube">
          <Cube />
        </div>
        <div className="home-tags">
          <div className="home__features-head">
            <h1>组件化开发</h1>
            <p>Star UI 基于 React 组件开发思想，独立而又外置通信方式，语义化 UI 的同时可作为一种数据类型自由传递。</p>
          </div>
          <Row gutter={8}>
            <Feature title="组件化" icon={img1}>
              基于 React 组件开发思想，简单、灵活、高效、复用。
            </Feature>
            <Feature title="覆盖广" icon={img2}>
              覆盖基础组件，高级交互，以及推出的数据可视化组件，兼容IE9+。
            </Feature>
            <Feature title="生态完整" icon={img3}>
              搭配配置好的脚手架，摆脱繁琐的环境配置、重复的基础工作。
            </Feature>
            <Feature title="完全免费" icon={img4}>
              基于 MIT 协议，将来计划进行免费开源。
            </Feature>
          </Row>
        </div>        
      </div>
    </div>
  );
};