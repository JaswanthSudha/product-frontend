import React, { useEffect, useState } from 'react';
import UseProduct from '../hooks/UseProduct';
import { serverUrl } from '../constants';
import Product from '../components/Product';
import AddProduct from '../components/AddProduct';

const Home = () => {
	const { products, dispatch } = UseProduct();
	const [featured, setFeatured] = useState(false);
	const [price, setPrice] = useState('');
	const [rate, setRate] = useState('');

	const fetchProducts = async () => {
		try {
			const response = await fetch(`${serverUrl}/product/getAllProducts`, {
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
			dispatch({ type: 'SETPRODUCTS', payload: json.data });
			console.log(json.data);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchFeatured = async () => {
		try {
			const response = await fetch(
				`${serverUrl}/product/fetchFeatureProducts`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token'),
						)}`,
					},
				},
			);
			const json = await response.json();
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
	const fetchHighRate = async () => {
		try {
			const response = await fetch(
				`${serverUrl}/product/highRate?rating=${rate}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token'),
						)}`,
					},
				},
			);
			const json = await response.json();
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
	const fetchLowPrice = async () => {
		try {
			const response = await fetch(
				`${serverUrl}/product/lessPrice?price=${price}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token'),
						)}`,
					},
				},
			);
			const json = await response.json();
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
	useEffect(() => {
		fetchProducts();
	}, []);
	useEffect(() => {
		if (featured === true) {
			fetchFeatured();
		} else {
			fetchProducts();
		}
	}, [featured]);
	// useEffect(() => {
	// 	if (rate === '') {
	// 		fetchProducts();
	// 	}
	// 	fetchHighRate();
	// }, [rate]);
	// useEffect(() => {
	// 	if (price === '') {
	// 		fetchProducts();
	// 	}
	// 	fetchLowPrice();
	// }, [price]);
	return (
		<div>
			<div className='h-[100px] flex justify-evenly  items-center'>
				<div>
					<span>Featured</span>
					<input
						type='checkbox'
						checked={featured}
						onChange={(e) => setFeatured(e.target.checked)}
					/>
				</div>
				<div>
					<textarea
						type='text'
						placeholder='products with price less than...'
						onChange={(e) => setPrice(e.target.value)}
					/>
					<button onClick={fetchLowPrice}>Submit</button>
				</div>
				<div>
					<textarea
						type='text'
						placeholder='products with rating greater than...'
						onChange={(e) => setRate(e.target.value)}
					/>
					<button onClick={fetchHighRate}>Submit</button>
				</div>
			</div>
			<div className='flex justify-between m-8'>
				<div className='grid md:grid-cols-4 gap-10'>
					{products.length > 0 &&
						products.map((product, key) => {
							return (
								<Product
									key={key}
									product={product}
								/>
							);
						})}
				</div>
				<div>
					<AddProduct />
				</div>
			</div>
		</div>
	);
};
export default Home;
