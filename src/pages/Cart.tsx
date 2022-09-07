import React from 'react';
import { useSelector } from 'react-redux';

import { Cart, CartEmpty } from '../components';
import { RootState } from '../store/store';

export const CartPage: React.FC = () => {
	const pizzas = useSelector((state: RootState) => state.cart.pizzas);

	return <div className="container">{Object.keys(pizzas).length ? <Cart /> : <CartEmpty />}</div>;
};
