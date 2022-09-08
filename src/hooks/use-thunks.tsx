import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { allThunks } from '../store/slices';

export const useThunks = () => {
	const dispatch = useDispatch();

	const { pizzaThunks } = allThunks;

	return {
		pizza: bindActionCreators(pizzaThunks, dispatch),
	};
};
