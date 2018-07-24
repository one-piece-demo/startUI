/**
 * 前端路由配置
 */

import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, IndexRoute, browserHistory} from 'react-router';
import auth from 'src/utils/auth';

import App from './pages/app/';

// 用户登录验证
function requireAuth(nextState, replace) {
  const path = nextState.location.pathname;
  
}

export default class RouterList extends Component{
	render() {
		return (
			<Router
        history={browserHistory}
      >
        <Route path="/"
          onEnter={(...args) => {
          requireAuth(...args);
        }}
        component={App} 
        breadcrumbName="/">
          <IndexRoute getComponent={(location, cb) => {
            require.ensure([], require => {
              cb(null, require('./pages/home/').default);
            });
          }} />
          <Route path="views" getComponent={(location, cb) => {
            require.ensure([], require => {
              cb(null, require('./pages/views/').default);
            });
          }}>
            <IndexRedirect to="/views/Icon" />
            <Route path=":component" getComponent={(nextState, cb) => {              
              const component = nextState.location.pathname.split('/').pop();
              require.ensure([], require => {
                cb(null, require(`./pages/views/docs/${component}.doc`).default);
              });
            }} />
          </Route>
          <Route path="guide" getComponent={(location, cb) => {
            require.ensure([], require => {
              cb(null, require('./pages/guide/').default);
            });
          }}>
            <IndexRedirect to="/guide/guide" />
            <Route path=":md" getComponent={(nextState, cb) => {
              const md = nextState.location.pathname.split('/').pop();
              require.ensure([], require => {
                cb(null, require(`./pages/guide/md/${md}.js`).default);
              });
            }} />
          </Route>         
          <Route path="*" getComponent={(location, cb) => {
            require.ensure([], require => {
              cb(null, require('./pages/notFound/').default);
            });
          }} />
        </Route>
      </Router>
		);
	}
}
