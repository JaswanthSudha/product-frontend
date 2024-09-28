import { createContext, useReducer, useEffect } from 'react';
export const UserContext = createContext();
const reducerFn = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { user: action.payload };
		case 'LOGOUT':
			return { user: null };
		default:
			return { user: state };
	}
};
export const UserContextProvider = ({ children }) => {
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			dispatch({ type: 'LOGIN', payload: user });
		}
	}, []);
	const [state, dispatch] = useReducer(reducerFn, {
		user: null,
	});
	console.log('state', state);
	return (
		<UserContext.Provider value={{ ...state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};
