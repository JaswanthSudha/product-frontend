import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { serverUrl } from '../constants';
import UseUser from '../hooks/UseUser';

const Register = () => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const { dispatch } = UseUser();
	const handleRegister = async (e) => {
		try {
			e.preventDefault();
			const data = {
				username: userName,
				password,
				email,
			};
			const response = await fetch(`${serverUrl}/user/registerUser`, {
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
			const payload = { username: json.data.createdUser.username };
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
				<h1 className='text-center text-2xl'>Register</h1>
				<input
					type='text'
					className='p-2 border-2 rounded-lg '
					placeholder='Enter Username'
					onChange={(e) => setUserName(e.target.value)}
				/>
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
					onClick={handleRegister}>
					SignUp
				</button>
			</form>
			<div>
				Already Have Account?
				<Link
					to='/login'
					className='bg-blue-500 p-2 rounded-lg ml-2'>
					Login
				</Link>
			</div>
		</div>
	);
};

export default Register;
