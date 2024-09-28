import { createContext, useReducer } from 'react';
export const ProductContext = createContext();
const reducerFn = (state, action) => {
	switch (action.type) {
		case 'SETPRODUCTS':
			return {
				products: action.payload,
			};
		case 'ADDPRODUCT': {
			return {
				products: [action.payload, ...state.products],
			};
		}
		case 'DELETEPRODUCT': {
			return {
				products: action.payload,
			};
		}
	}
};
export const ProductContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducerFn, {
		products: [],
	});
	return (
		<ProductContext.Provider value={{ ...state, dispatch }}>
			{children}
		</ProductContext.Provider>
	);
};
