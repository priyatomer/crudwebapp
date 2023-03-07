import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import ButtonComp from './ButtonComp';

const ProductList = () => {
	const [
		productListing,
		setProductListing
	] = useState([]);
	const [
		language,
		setLanguage
	] = useState('English');

	useEffect(() => {
		getProducts();
	}, []);
	const navigate = useNavigate();

	//Get product Listing
	const getProducts = async () => {
		const token = localStorage.getItem('usersdatatoken');
		const result = await fetch('http://localhost:3000/products', {
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
			setProductListing(data);
			navigate('/');
		}
	};

	//Delete Product
	const deleteProduct = async (id) => {
		console.log(id);
		const token = localStorage.getItem('usersdatatoken');
		let result = await fetch(`http://localhost:3000/products/${id}`, {
			method: 'Delete',
			headers: {
				Authorization: token
			}
		});
		result = await result.json();
		if (result) {
			getProducts();
		}
	};
	const onPressButton = (lng) => {
		setLanguage(lng);
	};
	return (
		<div className='productList'>
			<h1>{language == 'English' ? 'Product Listing' : 'Liste des produits'}</h1>
			<ButtonComp
				className='addButton'
				title='English'
				variant='primary'
				onClick={(event) => onPressButton('English')}
			/>
			<ButtonComp
				className='addButton'
				title='Français'
				variant='primary'
				onClick={(event) => onPressButton('French')}
			/>
			<Table striped bordered hover className='productList'>
				<thead>
					<tr>
						<th>{language == 'English' ? 'S. No' : 'S. Non'}</th>
						<th>{language == 'English' ? 'Name' : 'Nom'}</th>
						<th>{language == 'English' ? 'Price' : 'Prix'}</th>
						<th>{language == 'English' ? 'Description' : 'Description'}</th>
						<th>{language == 'English' ? 'Image' : 'Image'}</th>
						<th>{language == 'English' ? 'Operation' : 'Opération'}</th>
					</tr>
				</thead>

				{productListing.map((item, index) => {
					return (
						<tbody>
							<tr key={item._id}>
								<td>{index + 1}</td>
								<td>{language == 'English' ? item.name.en : item.name.fr}</td>
								<td>{item.price}</td>
								<td>{language == 'English' ? item.description.en : item.description.fr}</td>
								<td>
									<img
										style={{ width: 50, height: 50 }}
										src={'http://localhost:3000/' + item.image}
									/>
								</td>
								<td>
									<ButtonComp
										variant='danger'
										title={language == 'English' ? 'Delete' : 'Supprimer'}
										onClick={() => deleteProduct(item._id)}
									/>
									<Link to={'/update/' + item._id}>
										{language == 'English' ? 'Update' : 'Mise à jour'}
									</Link>
								</td>
							</tr>
						</tbody>
					);
				})}
			</Table>
		</div>
	);
};

export default ProductList;
