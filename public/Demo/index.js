import './index.less';
import React, { Component } from 'react';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Markdown from 'components/Markdown';
import {Icon, Tooltip } from 'antd';
import PreCode from 'components/PreCode';
import {Card, CardBody, CardFooter} from 'components/Card';

class Demo extends Component {

  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  // componentDidMount() {
  //   this.codeHeight = ReactDOM.findDOMNode(this.refs.pre).offsetHeight
  // }

  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    const { className, title, desc, code, link, children } = this.props;
    const { open } = this.state;
    const classNames = classnames('demo', {
      'demo--open': open
    }, className);
    
    return (
      <Card className={classNames}>
        <CardBody>
          <h2 className="demo__title">{title}</h2>
          <div className="demo__content">{children}</div>
          {desc && <div className="demo__desc">
            <Markdown html={desc} />
            {link ? <a href={link} target='_blank'>{link}</a> : null}
          </div>}
        </CardBody>
        <CardFooter>
          <div className="demo__toggle">
            <Tooltip title="example code">
              code&nbsp;<Icon type='code-o' onClick={this.handleToggle}/>
            </Tooltip>
          </div>
          <div className="demo__code" ref="pre">
            <PreCode theme='light'>{code}</PreCode>
          </div>
        </CardFooter>
      </Card>
    );
  }
}

export default Demo;
