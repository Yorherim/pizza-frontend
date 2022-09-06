import { PizzaType } from './../pizza/types';

export type PizzaCartType = Omit<PizzaType, 'sizes' | 'widths'> & {
	id: string;
	count: number;
	size: number;
	width: string;
};

export type CartStateType = {
	pizzas: PizzaCartType[];
	totalCount: number;
	totalPrice: number;
};
