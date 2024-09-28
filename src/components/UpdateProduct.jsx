import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { serverUrl } from '../constants';
const UpdateProduct = () => {
	const { id } = useParams();
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [price, setPrice] = useState('');
	const [rating, setRating] = useState('');
	const [featured, setFeatured] = useState('');
	const handleUpdate = async () => {
		try {
			const response = await fetch(`${serverUrl}/product/updateProduct/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				},
				body: JSON.stringify({ name, company, price, rating, featured }),
			});
			const json = await response.json();
			if (!json.success) {
				alert(json.message);
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};
	const getProduct = async () => {
		const response = await fetch(`${serverUrl}/product/getProductId/${id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
			},
		});
		const json = await response.json();
		if (!json.success) {
			alert(json.message);
			return;
		}

		setCompany(json.data.company);
		setPrice(json.data.price);
		setName(json.data.name);
		setRating(json.data?.rating ? json.data.rating : 0);
		setFeatured(json.data?.featured);
	};
	useEffect(() => {
		getProduct();
	}, []);
	return (
		<div>
			<form className='m-2 p-8 border-2 rounded-lg flex flex-col  justify-evenly h-[500px]'>
				<input
					className='border-2 rounded-lg p-4'
					type='text'
					placeholder='Name'
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<input
					className='border-2 rounded-lg p-4'
					type='text'
					placeholder='Company'
					onChange={(e) => setCompany(e.target.value)}
					value={company}
				/>
				<input
					className='border-2 rounded-lg p-4'
					type='text'
					placeholder='Price'
					onChange={(e) => setPrice(e.target.value)}
					value={price}
				/>
				<input
					className='border-2 rounded-lg p-4'
					type='text'
					placeholder='Rating'
					value={rating}
					onChange={(e) => setRating(e.target.value)}
				/>
				<div>
					<span className='font-bold mr-2'>Featured</span>
					<input
						className='border-2 rounded-lg p-4'
						type='checkbox'
						checked={featured}
						onChange={(e) => setFeatured(e.target.checked)}
					/>
				</div>
				<Link
					onClick={handleUpdate}
					to='/'
					className='w-[100px] text-center p-3 rounded-lg bg-red-500'>
					Update
				</Link>
			</form>
		</div>
	);
};

export default UpdateProduct;
