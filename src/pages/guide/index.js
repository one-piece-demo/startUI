import React, { Component } from 'react';
import {Link} from 'react-router';
import { Layout, LayoutSidebar, LayoutContent } from 'components/Layout';
import { Menu, Icon } from 'antd';
import mdNav from './mdNav.js';
import './index.less';

class Guide extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  toggle(open) {
    this.setState({ open });
  }

  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    const { open } = this.state;
    const { children, params } = this.props;
    return (
      <div className='guide'>
        <Layout open={open} onToggle={open => this.toggle(open)}>
          <LayoutSidebar>
            <Menu
              onClick={this.handleClick}
              style={{ width: 220 }}
              defaultSelectedKeys={[params.md]}
              mode="inline"
            >
              {
                mdNav.map((item) => {
                  return (<Menu.Item key={item.en}>
                    <Link to={'/guide/' + item.en}><Icon type={item.icon} />&nbsp;{item.zh}</Link>
                  </Menu.Item>);
                })
              }
            </Menu>
          </LayoutSidebar>
          <LayoutContent>
            {children}
          </LayoutContent>
        </Layout>
      </div>
    );
  }
}

export default Guide;