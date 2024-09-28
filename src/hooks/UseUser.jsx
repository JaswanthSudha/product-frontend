import { UserContext } from '../context/User';
import { useContext } from 'react';
const UseUser = () => {
	const context = useContext(UserContext);
	return context;
};
export default UseUser;
