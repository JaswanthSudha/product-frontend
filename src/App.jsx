import React from 'react';
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import UseUser from './hooks/UseUser';
import Login from './pages/Login';
import UpdateProduct from './components/UpdateProduct';

const App = () => {
	const { user, dispatch } = UseUser();
	return (
		<BrowserRouter>
			{user?.username && (
				<button
					className='text-end'
					onClick={() => {
						dispatch({ type: 'LOGOUT' });
						localStorage.removeItem('user');
						localStorage.removeItem('token');
						redirect('/login');
					}}>
					Logout
				</button>
			)}

			<Routes>
				<Route
					path='/'
					element={user?.username ? <Home /> : <Login />}
				/>

				<Route
					path='/register'
					element={user?.username ? <Home /> : <Register />}
				/>
				<Route
					path='/update/:id'
					element={<UpdateProduct />}
				/>
				<Route
					path='/login'
					element={user?.username ? <Home /> : <Login />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
