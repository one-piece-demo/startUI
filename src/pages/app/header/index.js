import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Layout, Icon, Row, Col } from 'antd';
import './index.less';

const { Header } = Layout;

class Head extends Component {

  constructor() {
    super();

    this.state = {

    };
  }

  componentDidMount() {
    
  }

  renderNav() {
    return (
      <ul>
        <li className='header-nav-list'>
          <Link to="/guide" activeClassName="active"><Icon type='bulb' />&nbsp;指南</Link>
        </li>
        <li className='header-nav-list'>
          <Link to="/views" activeClassName="active"><Icon type='appstore' />&nbsp;组件</Link>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <Header className="header clear-float" >
        <div className='left' >
          <Row gutter={16}>
            <Col className='left'>
              <Link to="/" className="header__logo">
                Star UI <sub>v0.x</sub>
              </Link>
            </Col>
            <Col className="header__nav left">
              {this.renderNav()}
            </Col>
          </Row>
        </div>
        <div className="header__right right" >
          <a
            href="http://172.168.0.114:8089/wuzhong/xj-web-scaffold"
            target="_blank"
            className="header__github"
          >
            <Icon type="github" />
          </a>
        </div>
      </Header>
    );
  }
}

Head.propTypes = {
  location: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Head;