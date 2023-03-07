import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComp from './ButtonComp';
import InputComp from './InputComp';

const AddProduct = () => {
	const [
		name,
		setName
	] = useState('');
	const [
		otherName,
		setOtherName
	] = useState('');
	const [
		file,
		setFile
	] = useState('');
	const [
		price,
		setPrice
	] = useState('');
	const [
		description,
		setDescription
	] = useState('');
	const [
		otherDescription,
		setOtherDescription
	] = useState('');
	const [
		error,
		setError
	] = useState(false);

	const navigate = useNavigate();
	const addProduct = async () => {
		const token = localStorage.getItem('usersdatatoken');
		if (!name || !price || !description || !file || !otherDescription || !otherName) {
			setError(true);
			return false;
		}

		const formData = new FormData();
		formData.append('image', file);
		formData.append('name', name);
		formData.append('otherName', otherName);
		formData.append('price', price);
		formData.append('description', description);
		formData.append('otherDescription', otherDescription);
		let result = await fetch('http://localhost:3000/products', {
			method: 'post',
			headers: {
				Authorization: token
			},
			body: formData
		});
		if (result.status == 401) {
			navigate('*');
		} else {
			navigate('/');
		}
	};
	return (
		<div className='product'>
			<h1 className='updatetext'>Add Product</h1>
			<InputComp
				type='text'
				placeholder='Enter Product Name'
				className='inputBox'
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			{error && !name && <span className='invalidInput'>Enter valid name</span>}
			<InputComp
				type='text'
				placeholder='Enter French Product Name'
				className='inputBox'
				value={otherName}
				onChange={(e) => {
					setOtherName(e.target.value);
				}}
			/>
			{error && !otherName && <span className='invalidInput'>Enter valid french name</span>}
			<InputComp
				type='text'
				placeholder='Enter Product Price'
				className='inputBox'
				value={price}
				onChange={(e) => {
					setPrice(e.target.value);
				}}
			/>
			{error && !price && <span className='invalidInput'>Enter valid price</span>}
			<InputComp
				type='text'
				placeholder='Enter Product Description'
				className='inputBox'
				value={description}
				onChange={(e) => {
					setDescription(e.target.value);
				}}
			/>
			{error && !description && <span className='invalidInput'>Enter valid description</span>}
			<InputComp
				type='text'
				placeholder='Enter French Product Description'
				className='inputBox'
				value={otherDescription}
				onChange={(e) => {
					setOtherDescription(e.target.value);
				}}
			/>
			{error && !otherDescription && <span className='invalidInput'>Enter valid French description</span>}
			<InputComp
				type='file'
				placeholder='Enter File '
				className='inputBox'
				// value={file}
				onChange={(e) => {
					setFile(e.target.files[0]);
				}}
			/>
			{error && !file && <span className='invalidInput'>Enter valid file</span>}
			<ButtonComp className='addButton' title='Add Product' variant='primary' onClick={addProduct} />
		</div>
	);
};

export default AddProduct;
