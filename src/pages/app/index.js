import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { colorAction } from 'src/action/';

import Head from './header/';
import Body from './body/';
import Foot from './footer/';
import {Layout} from 'antd';
import './index.less';

const {
  colorChange
} = colorAction;

class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
   
  }

  render() {
    const { children, routes, location } = this.props;
    // console.log(routes)
    const comment = (<Layout  key="layout" className='layout-row'>
      <Layout  key="layout-content">
        <Head key="header" location={location} toggle={this.toggle}/>
        <Body key="body">
          {children}
        </Body>
        <Foot  key="footer"/>
      </Layout>
    </Layout>);

    let main = [comment];

    // 首页和 404 页不渲染 Header
    if (routes[1]) {
      const path = routes[1].path;
      
      if (path === undefined || path === '*') {
        main = [<Body key="body">
        {children}
      </Body>, <Foot  key="footer"/>];
      }
    }

    return (
      <div className="wrapper">
        <Layout>
          {main}
        </Layout>          
      </div>
    );
  }
}

App.propTypes = {
  color: PropTypes.object
};

const mapStateToProps = (state) => {
  const { color } = state;
  // console.log(color)
  return {
    color
  };
};

function mapDispatchToProps(dispatch) {
  return {
    colorChange: bindActionCreators(colorChange, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
