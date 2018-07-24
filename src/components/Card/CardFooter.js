import React from 'react';
import classnames from 'classnames';

const CardFooter = (props) => {
	const {className, children, ...other} = props;

	return (
		<div className={classnames('xj-card-footer', className)} {...other}>
			{children}
		</div>
	);
};

export default CardFooter;