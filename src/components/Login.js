import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComp from './ButtonComp';
import InputComp from './InputComp';

const Login = () => {
	const [
		email,
		setEmail
	] = useState('');

	const [
		password,
		setPassword
	] = useState('');

	const [
		error,
		setError
	] = useState(false);

	const navigate = useNavigate();
	const loginUser = async () => {
		const result = await fetch('http://localhost:3000/products/signin', {
			method: 'Post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email, //email:email
				password
			})
		});
		const data = await result.json();
		if (data.status === 201) {
			localStorage.setItem('usersdatatoken', data.result.token);
			navigate('/about');
		} else {
			window.alert('Invalid Credentials');
		}
		// if (data.error || !data) {
		// 	window.alert('Invalid Credentials');
		// } else {
		// 	window.alert('Login Successful');
		// 	navigate('/');
		// }
	};

	return (
		<div className='product'>
			<h1 className='updatetext'>Login Page</h1>

			<InputComp
				type='email'
				placeholder='Enter Email '
				name='email'
				autoComplete='off'
				className='inputBox'
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			{error && !email && <span className='invalidInput'>Enter valid email</span>}

			<InputComp
				type='password'
				name='password'
				placeholder='Enter Password'
				className='inputBox'
				autoComplete='off'
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			{error && !password && <span className='invalidInput'>Enter valid password</span>}

			<ButtonComp className='addButton' title='Login' variant='primary' onClick={loginUser} />
		</div>
	);
};

export default Login;
