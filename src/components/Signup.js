import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComp from './ButtonComp';
import InputComp from './InputComp';

const Signup = () => {
	const [
		user,
		setUser
	] = useState({
		name: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: ''
	});
	const [
		name,
		setName
	] = useState('');
	const [
		email,
		setEmail
	] = useState('');
	const [
		phone,
		setPhone
	] = useState('');
	const [
		password,
		setPassword
	] = useState('');
	const [
		confirmPassword,
		setConfirmPassword
	] = useState('');

	const [
		error,
		setError
	] = useState(false);

	const navigate = useNavigate();
	let names, value;
	const handleInputs = (e) => {
		names = e.target.name;
		value = e.target.value;
		setUser({ ...user, [names]: value });
	};

	const registerUser = async () => {
		const { name, email, phone, password, confirmPassword } = user;
		const result = await fetch('http://localhost:3000/products/register', {
			method: 'Post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				email,
				phone,
				password,
				confirmPassword
			})
		});
		const data = await result.json();
		localStorage.setItem('user', JSON.stringify(data.data));
		if (data.error || !data) {
			window.alert('Invalid Registration');
		} else {
			window.alert('Registration Successful');
			navigate('/signin');
		}
	};

	console.log(user, 'hello user');
	return (
		<div className='product'>
			<h1 className='updatetext'>Register Page</h1>
			<InputComp
				type='text'
				placeholder='Enter Name'
				name='name'
				className='inputBox'
				autoComplete='off'
				value={user.name}
				onChange={handleInputs}
			/>
			{error && !name && <span className='invalidInput'>Enter valid name</span>}
			<InputComp
				type='email'
				placeholder='Enter Email '
				name='email'
				autoComplete='off'
				className='inputBox'
				value={user.email}
				onChange={handleInputs}
			/>
			{error && !email && <span className='invalidInput'>Enter valid email</span>}
			<InputComp
				type='number'
				placeholder='Enter Phone No.'
				className='inputBox'
				name='phone'
				autoComplete='off'
				value={user.phone}
				onChange={handleInputs}
			/>
			{error && !phone && <span className='invalidInput'>Enter valid phoneno</span>}
			<InputComp
				type='password'
				name='password'
				placeholder='Enter Password'
				className='inputBox'
				autoComplete='off'
				value={user.password}
				onChange={handleInputs}
			/>
			{error && !password && <span className='invalidInput'>Enter valid password</span>}
			<InputComp
				type='password'
				placeholder='Enter Confirm Password'
				name='confirmPassword'
				className='inputBox'
				autoComplete='off'
				value={user.confirmPassword}
				onChange={handleInputs}
			/>
			{error && !confirmPassword && <span className='invalidInput'>Enter valid confirm password</span>}

			<ButtonComp className='addButton' title='Register' variant='primary' onClick={registerUser} />
		</div>
	);
};

export default Signup;
