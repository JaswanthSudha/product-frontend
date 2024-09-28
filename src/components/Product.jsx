import React from 'react';
import { Link } from 'react-router-dom';
import { serverUrl } from '../constants';
import UseProduct from '../hooks/UseProduct';
const Product = ({ product }) => {
	const { dispatch } = UseProduct();
	const handleDelete = async () => {
		try {
			const response = await fetch(
				`${serverUrl}/product/deleteProduct/${product._id}`,
				{
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token'),
						)}`,
					},
				},
			);

			const allProducts = await fetch(`${serverUrl}/product/getAllProducts`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				},
			});
			const json = await allProducts.json();
			if (!json.success) {
				alert(json.message);
				return;
			}
			dispatch({ type: 'SETPRODUCTS', payload: json.data });
			console.log(json.data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='bg-gray-300 m-2 p-8  rounded-lg'>
			<div>Name:{product.name}</div>
			<div>Company:{product.company}</div>
			<div>Price:{product.price}</div>
			<div>Rating:{product?.rating ? product?.rating : 0}</div>
			<div>
				<Link
					to={`/update/${product._id}`}
					className='bg-green-500 mt-2 p-2 rounded-sm mr-2'>
					Update
				</Link>
				<button
					onClick={handleDelete}
					className='bg-red-500 p-2 mt-2 rounded-sm'>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Product;
