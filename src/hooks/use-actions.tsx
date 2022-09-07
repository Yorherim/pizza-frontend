import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { allActions } from '../store/slices';

export const useActions = () => {
	const dispatch = useDispatch();

	const { appActions, cartActions, filterPizzaActions, pizzaActions } = allActions;

	return {
		app: bindActionCreators(appActions, dispatch),
		pizza: bindActionCreators(pizzaActions, dispatch),
		cart: bindActionCreators(cartActions, dispatch),
		filterPizza: bindActionCreators(filterPizzaActions, dispatch),
	};
};
