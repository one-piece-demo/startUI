import React from 'react';
import classnames from 'classnames';

const Card = (props) => {
	const {className, children, border, ...other} = props;

	return (
		<div className={classnames('xj-card', className, {'hide-border': border})} {...other}>
			{children}
		</div>
	);
};

export default Card;