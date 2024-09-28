import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { serverUrl } from '../constants';
import UseUser from '../hooks/UseUser';

const Login = () => {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const { dispatch } = UseUser();
	const handleLogin = async (e) => {
		try {
			e.preventDefault();
			const data = {
				password,
				email,
			};
			const response = await fetch(`${serverUrl}/user/loginUser`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			const json = await response.json();
			if (!json.success) {
				alert(json.message);
				return;
			}
			const token = json.data.token;
			const payload = { username: json.data.user.username };
			localStorage.setItem('token', JSON.stringify(token));
			localStorage.setItem('user', JSON.stringify(payload));
			dispatch({ type: 'LOGIN', payload });
		} catch (error) {
			console.log('error', error);
		}
	};
	return (
		<div className='flex justify-center items-center h-screen w-screen flex-col gap-2'>
			<form className='flex flex-col w-[350px] gap-2'>
				<h1 className='text-center text-2xl'>Login</h1>
				<input
					type='email'
					className='p-2 border-2 rounded-lg '
					placeholder='Enter Email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type='password'
					className='p-2 border-2 rounded-lg '
					placeholder='Enter Password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					className='bg-red-500 p-2 rounded-lg'
					onClick={handleLogin}>
					Login
				</button>
			</form>
			<div>
				New User?
				<Link
					to='/register'
					className='bg-blue-500 p-2 rounded-lg ml-2'>
					Register
				</Link>
			</div>
		</div>
	);
};

export default Login;
