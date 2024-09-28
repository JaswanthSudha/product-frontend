import React, { useState } from 'react';
import UseProduct from '../hooks/UseProduct';
import { serverUrl } from '../constants';
const AddProduct = () => {
	const { user, dispatch } = UseProduct();
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [price, setPrice] = useState('');
	const handleAddProduct = async (e) => {
		try {
			e.preventDefault();
			const response = await fetch(`${serverUrl}/product/addProduct`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				},
				body: JSON.stringify({ name, company, price }),
			});

			const json = await response.json();

			if (!json.success) {
				alert(json.message);
				return;
			}
			setCompany('');
			setPrice('');
			setName('');
			dispatch({ type: 'ADDPRODUCT', payload: json.data });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='m-2 p-8 border-2 border-gray-900 rounded-lg '>
			<form className='flex flex-col w-full justify-evenly gap-10 '>
				<input
					className='border-2 rounded-lg p-4'
					type='text'
					value={name}
					placeholder='Name'
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className='border-2 rounded-lg p-4'
					type='text'
					value={price}
					placeholder='Price'
					onChange={(e) => setPrice(e.target.value)}
				/>

				<input
					className='border-2 rounded-lg p-4'
					type='text'
					value={company}
					placeholder='Company'
					onChange={(e) => setCompany(e.target.value)}
				/>
				<button
					className='bg-blue-500 hover:bg-blue-200 p-2 rounded-lg'
					onClick={handleAddProduct}>
					Add Product
				</button>
			</form>
		</div>
	);
};

export default AddProduct;
