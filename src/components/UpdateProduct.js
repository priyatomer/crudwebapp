import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonComp from './ButtonComp';
import UpdateInputComp from './UpdateInputComp';


const UpdateProduct = () => {
	const [name,setName] = useState('');
	const [otherName,setOtherName] = useState('');
	const [price,setPrice] = useState('');
	const [description,setDescription] = useState('');
	const [otherDescription,setOtherDescription] = useState('');
	const [file,setFile] = useState('');
	const [data,setData] = useState([]);
    const [error,setError]=useState(false);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		getProductDetails();
	}, []);

	const getProductDetails = async () => {
		const token = localStorage.getItem('usersdatatoken');
		let result = await fetch(`http://localhost:3000/products/${params?.id}`,{
			method:'Get',
			headers: {
				Authorizataion: token
			},
		});
		result = await result.json();
		setData(result);
		setName(result.name?.en);
		setPrice(result.price);
		setDescription(result.description?.en);
		setFile(result.image);
		setOtherName(result.name?.fr);
		setOtherDescription(result.description?.fr);
	};
	const updateProduct = async (id) => {
        if(!file){
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
		const token = localStorage.getItem('usersdatatoken');
		let result = await fetch(`http://localhost:3000/products/${params.id}`, {
			method: 'put',
			headers: {
				Authorization: token
			},
			body: formData
		});

		if (result.status==200) {
			navigate('/');
		}
	};

	return (
		<div className='product'>
			<h1 className='updatetext'>Update Product</h1>
         <UpdateInputComp
            type='text'
				placeholder='Enter Product Name'
				className='inputBox'
				defaultValue={data.name?.en}
				onChange={(e) => {
					setName(e.target.value);
				}}
         />
		 <UpdateInputComp
				type='text'
				placeholder='Enter French Product Name'
				className='inputBox'
				defaultValue={data.name?.fr}
				onChange={(e) => {
					setOtherName(e.target.value);
				}}
			/>
            <UpdateInputComp
                type='number'
				placeholder='Enter Product Price'
				className='inputBox'
				defaultValue={data.price}
				onChange={(e) => {
					setPrice(e.target.value);
				}}
            />
            <UpdateInputComp
                type='text'
				placeholder='Enter Product Description'
				className='inputBox'
				defaultValue={data.description?.en}
				onChange={(e) => {
					setDescription(e.target.value);
				}}
            />
			 <UpdateInputComp
                type='text'
				placeholder='Enter Product French Description'
				className='inputBox'
				defaultValue={data.description?.fr}
				onChange={(e) => {
					setOtherDescription(e.target.value);
				}}
            />
            <UpdateInputComp
                type='file'
				placeholder='Enter File '
				className='inputBox'
				defaultValue={data.image}
				onChange={(e) => {
					setFile(e.target.files[0]);
				}}
            />
         {error && file && <span className='invalidInput'>Enter File</span>}
			<img style={{ width: 100 }} src={'http://localhost:3000/' + data.image} />
             <ButtonComp className='addButton' title='Update Product' variant='primary' onClick={() => updateProduct(data._id)} />
		</div>
	);
};

export default UpdateProduct;
