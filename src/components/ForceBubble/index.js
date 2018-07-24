import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDM from 'react-dom';
import Bubble from './main';
import './index.less';

class ForceBubble extends Component {
	constructor() {
		super();
		
		this.state = {
			
		};
	}

	componentDidMount() {
		this.container = ReactDM.findDOMNode(this.refs.bubbleChart);
		this.renderChart(this.props);
	}

	componentWillReceiveProps(nextProps) { 
		if('data' in nextProps) {
			this.renderChart(nextProps);
		}
	}

	renderChart(props) {
		new Bubble({
			container: this.container,
			data: props.data,
			...props
		});
	}

	render() {
		return (
			<div className='company-bubble-chart'>
				<div className='bubble-chart-box' ref='bubbleChart'>
				</div>
			</div>
		);
	} 
}

ForceBubble.propTypes = {
	/**
	 * 气泡群数据
	 * ```js
 	 * [{}]
	 * ```
	 */ 
	data: PropTypes.array.isRequired,
	// 气泡半径得判断标准 字段名
	radiusMaker: PropTypes.string.isRequired,
	// 气泡显示 name  字段名
	name: PropTypes.string,
	/**
	 * 显示大小值 字段名
	 * ```js
	 * {{key: 'num'}}
	 * ```
	 * 
	 */
	value: PropTypes.object,
};

export default ForceBubble;