import { ProductContext } from '../context/Products';
import { useContext } from 'react';
const UseProduct = () => {
	const context = useContext(ProductContext);
	return context;
};
export default UseProduct;
