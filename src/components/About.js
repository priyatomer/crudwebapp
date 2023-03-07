import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';

const About = () => {
	const { loginData, setLoginData } = useContext(LoginContext);
	const navigate = useNavigate();
	useEffect(() => {
		callAboutUsPage();
	}, []);

	const callAboutUsPage = async () => {
		const token = localStorage.getItem('usersdatatoken');
		const result = await fetch('http://localhost:3000/about', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token
			}
		});
		const data = await result.json();
		if (data.status == 401 || !data) {
			navigate('*');
		} else {
			setLoginData(data);
			navigate('/about');
		}
	};
	return <h1>Hi {loginData.validateOneUser?.email} </h1>;
};

export default About;
