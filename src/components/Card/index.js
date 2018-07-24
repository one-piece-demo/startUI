import './index.less';
import PropTypes from 'prop-types';
import Card from './Card';
import CardHead from './CardHead';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

Card.propTypes = {
	// 控制card的边框有无
	border: PropTypes.bool
};

export  {
	Card,
	CardBody,
	CardHead,
	CardFooter
};