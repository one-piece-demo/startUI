import './index.less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Row, Col, Button, Icon } from 'antd';

class Layout extends Component {

  getChildContext() {
    return {
      layout: this
    };
  }

  close() {
    this.props.open && this.props.onToggle(false);
  }

  toggle(e) {
    e.stopPropagation();
    this.props.onToggle(!this.props.open);
  }

  render() {
    const { open, className, children } = this.props;
    return (
      <Row className={classnames('layout', 'clear-float', {'layout--open': open}, className)}>
        {children}
      </Row>
    );
  }
}

Layout.childContextTypes = {
  layout: PropTypes.instanceOf(Layout)
};

Layout.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

const LayoutSidebar = props => {
  const { children } = props;
  return <Col className="layout__sidebar left">{children}</Col>;
};

const LayoutContent = (props, { layout }) => {
  const { children } = props;
  return (
    <Col className="layout__content left" onClick={() => layout.close()}>
      <Button type="primary"  className="layout__toggle" onClick={e => layout.toggle(e)}>
        <Icon type={'menu-fold'} />
      </Button>
      {children}
    </Col>
  );
};

LayoutContent.contextTypes = {
  layout: PropTypes.object
};

export { Layout, LayoutSidebar, LayoutContent };
