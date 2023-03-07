import React from 'react';

const UpdateInputComp = ({ placeholder, type, onChange, className, defaultValue }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={className}
			onChange={onChange}
			defaultValue={defaultValue}
		/>
	);
};

export default UpdateInputComp;
