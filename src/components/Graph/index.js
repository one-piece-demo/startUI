import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDM from 'react-dom';
import AtlasChart from './main';
import './index.less';

class Graph extends Component {
	constructor() {
		super();
		
		this.state = {
			
		};
	}

	componentDidMount() {
		this.container = ReactDM.findDOMNode(this.refs.atlasChart);

		this.data = this.EditData(this.props.data);
		this.renderChart(this.props);
	}

	componentWillReceiveProps(nextProps) { 
		if('data' in nextProps || 'options' in nextProps) {
			this.data =  this.EditData(nextProps.data);
			this.renderChart(nextProps);
		}
	}

	EditData(data) {
		const colors = ['#8193e8', '#b976c9', '#ee2cac', '#c7d72c', '#99de93', '#35addc', '#b4cbe9'];

		data.group = 0;
		data.node_name = data.name;
		
		function setGroup(children, parent) { 
			children.forEach(item => {
				item.group = parent.group;
				item.color = parent.color;
				item.node_name = item.name;
				if(item.children && item.children.length) {
					item.children = setGroup(item.children, item);
				}
			});

			return children;
		}

		data.children.forEach((item, i) => {
			item.group = i+1;
			item.color = colors[i] || '#efefef';
			item.node_name = item.name;
			if(item.children && item.children.length) {
				item.children = setGroup(item.children, item);
			}
		});

		return data;
	}

	renderChart(props) {
		new AtlasChart({
			container: this.container,
			atlasData: this.data,
			...props
		});
	}

	render() {
		return (
			<div className='company-atlas-chart'>
				<div className='atlas-chart-box' ref='atlasChart'>
				</div>
			</div>
		);
	} 
}

Graph.propTypes = {
	/**
	 * 关系数据
	 * ```js
	 * {
	 * 		id: 0,
	 * 		name: 'pnode',
	 * 		children: [
	 * 			{
	 * 				id:'001',
	 *			  name:'cnode'
	 * 			}
	 * 		]
	 * 	}
	 * ```
	 */ 
	data: PropTypes.object,
	/**
	 * 配置
	 * ```js 
	 * {
	 *  zoom: {
	      scale:0.8, 
	      x:0, 
				y:0,
				rotate: 0
	    }
	 * }
	 *
	 * ```
	 */
	options: PropTypes.object
};

export default Graph;