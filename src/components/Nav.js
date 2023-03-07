import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonComp from './ButtonComp';
import { LoginContext } from './ContextProvider/Context';

const Nav = () => {
	const { loginData, setLoginData } = useContext(LoginContext);
	const navigate = useNavigate();
	const logoutUser = async () => {
		const token = localStorage.getItem('usersdatatoken');

		const result = await fetch('http://localhost:3000/logout', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
				Accept: 'application/json'
			}
			// credentials: 'include'
		});
		const data = await result.json();
		if (data.status == 201) {
			localStorage.removeItem('usersdatatoken');
			setLoginData(false);
			navigate('/signin');
		} else {
			console.log('error in logout page');
		}
	};
	return (
		<div>
			<ul className='nav-ul'>
				{!loginData.validateOneUser && (
					<li>
						<Link to='/signup'>Register</Link>
					</li>
				)}
				{!loginData.validateOneUser && (
					<li>
						<Link to='/signin'>Login</Link>
					</li>
				)}
				{loginData.validateOneUser && (
					<li>
						<Link to='/about'>About</Link>
					</li>
				)}
				{loginData.validateOneUser && (
					<li>
						<Link to='/'>Products</Link>
					</li>
				)}
				{loginData.validateOneUser && (
					<li>
						<Link to='/add'>Add Product</Link>
					</li>
				)}

				{loginData.validateOneUser && (
					<ButtonComp onClick={() => logoutUser()} className='addButton' title='Logout' variant='primary'>
						<li>
							<Link to='/logout'>Logout</Link>
						</li>
					</ButtonComp>
				)}

				{/* <li>
					<Link to='/update'>Update Product</Link>
				</li> */}
			</ul>
		</div>
	);
};

export default Nav;
