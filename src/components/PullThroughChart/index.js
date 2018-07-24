import React, {Component} from 'react'; 
import PropTypes from 'prop-types';
import ReactDM from 'react-dom';
import pullChart from './main';
import './index.less';

class PullThroughChart extends Component {
	constructor() {
		super();
		
		this.state = {
			
		}; 
	}

	componentDidMount() {
		this.container = ReactDM.findDOMNode(this.refs.chart);
		this.data = this.EditData(this.props.data);
		this.data && this.renderChart(this.props);
	}

	componentWillReceiveProps(nextProps) { 
		if('data' in nextProps || 'options' in nextProps) {
			this.data =  this.EditData(nextProps.data);
			this.renderChart(nextProps);
		}
	}

	EditData(data) {
		return data;
	}

	renderChart(props) {
		new pullChart({
			container: this.container,
			pullData: this.data,
			...props
		});
	}

	render() {
		return (
			<div className='company-atlas-chart'>
				<div className='atlas-chart-box' ref='chart'>
				</div>
			</div>
		);
	}
}

PullThroughChart.propTypes = {
	/**
	 * 拉通数据
	 * ```js
	 * {
	 * 		obj: {
	 * 			id: 0,
	 * 			name: 'GID',
	 * 			value: 500
	 * 		},
	 * 		relations: [
	 * 			{
	 * 					id: 0,
	 * 					name: 'qq',
	 * 					value: 300,
	 * 					distance: 100   //拉通数量
	 * 			}
	 * 		]
	 * }
	 * ```
	 */ 
	data: PropTypes.object.isRequired,
	/**
	 * 配置
	 * ```js 
	 * {
	 *  zoom: {
	      scale:0.8, 
	      x:0, 
	      y:0
	    }
	 * }
	 *
	 * ```
	 */
	options: PropTypes.object,

	// 返回 选中key[name],  根据key获取格式化数据，重新生成关系图
	formatData: PropTypes.func
};

export default PullThroughChart;