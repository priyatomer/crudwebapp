import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonComp = ({ title, onClick, variant, className }) => {
	return (
		<Button variant={variant} onClick={onClick} className={className}>
			{title}
		</Button>
	);
};

export default ButtonComp;
