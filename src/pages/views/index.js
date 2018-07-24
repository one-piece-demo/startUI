import React, {Component} from 'react';
import {Link} from 'react-router';
import { Layout, LayoutSidebar, LayoutContent } from 'components/Layout';
import { Menu, Icon } from 'antd';
import componentsNav from './componentsNav.js';
import './index.less';

const SubMenu = Menu.SubMenu;

class Views extends Component {
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
    // console.log('click ', e);
  }

  render() {
    const { open } = this.state;
    const { children } = this.props;
    return (
      <div className='views'>
        <Layout open={open} onToggle={open => this.toggle(open)}>
          <LayoutSidebar>
            <Menu
              onClick={this.handleClick}
              style={{ width: 220 }}
              defaultOpenKeys={['sub0']}
              mode="inline"
            >
            {
              componentsNav.map((item, i) => {
                  return (<SubMenu key={"sub" + i} title={<span><Icon type={item.icon} /><span>{item.zh}</span></span>}>
                  {item.components.map(((list, l) => {
                    if(list.type == 'sub') {
                      return (<SubMenu key={"sub" + i + l} title={list.name + ' ' + list.zh}>
                      {list.components.map((kt, n) => {
                          return (<Menu.Item key={"sub" + i + l + n}>
                            <Link to={'/views/' +kt.name}>{kt.name + ' ' + kt.zh}</Link>
                          </Menu.Item>);
                      })}
                      </SubMenu>);
                    }
                    return (<Menu.Item key={"sub" + i + l}>
                      <Link to={'/views/' +list.name}>{list.name + ' ' + list.zh}</Link>
                    </Menu.Item>);
                  }))}
                  </SubMenu>);
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

export default Views;