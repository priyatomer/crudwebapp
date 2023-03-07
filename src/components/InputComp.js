import React from 'react';

const InputComp = ({ placeholder, type, value, onChange, className, name }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={className}
			value={value}
			onChange={onChange}
			name={name}
		/>
	);
};

export default InputComp;
