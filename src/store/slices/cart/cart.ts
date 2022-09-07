import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CartStateType, PizzaCartType } from './types';

const initialState: CartStateType = {
	pizzas: [],
	totalCount: 0,
	totalPrice: 0,
};

export const cartSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		addPizzaInCart: (state, action: PayloadAction<Omit<PizzaCartType, 'count' | 'id'>>) => {
			const findedPizza = state.pizzas.find((pizza) => {
				return (
					pizza.title === action.payload.title &&
					pizza.size === action.payload.size &&
					pizza.width === action.payload.width
				);
			});

			if (findedPizza) {
				findedPizza.count += 1;
			} else {
				const pizza: PizzaCartType = { id: nanoid(), ...action.payload, count: 1 };
				state.pizzas.push(pizza);
			}
			state.totalPrice += action.payload.price;
			state.totalCount += 1;
		},

		incrementPizzaInCart: (state, action: PayloadAction<string>) => {
			const pizzaCartId = action.payload;
			const findedPizza = state.pizzas.find((pizza) => {
				return pizza.id === pizzaCartId;
			});
			findedPizza!.count += 1;
			state.totalCount += 1;
			state.totalPrice += findedPizza!.price;
		},

		decrementPizzaInCart: (state, action: PayloadAction<string>) => {
			const pizzaCartId = action.payload;
			let pizzaIndex = null;
			const findedPizza = state.pizzas.find((pizza, i) => {
				if (pizza.id === pizzaCartId) {
					pizzaIndex = i;
					return pizza;
				}
			});

			findedPizza!.count -= 1;
			if (findedPizza!.count === 0 && pizzaIndex !== null) {
				state.pizzas = state.pizzas.filter((pizza) => pizza.id !== findedPizza!.id);
			}
			state.totalCount -= 1;
			state.totalPrice -= findedPizza!.price;
		},

		deletePizzasByIdInCart: (state, action: PayloadAction<string>) => {
			const pizzaCartId = action.payload;
			for (const pizza of state.pizzas) {
				if (pizza.id === pizzaCartId) {
					state.pizzas = state.pizzas.filter((pizza) => pizza.id !== pizzaCartId);
					state.totalCount -= pizza.count;
					state.totalPrice -= pizza.price * pizza.count;
					break;
				}
			}
		},

		deleteAllPizzasInCart: (state) => {
			state.pizzas = [];
			state.totalCount = 0;
			state.totalPrice = 0;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
