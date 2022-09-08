import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CartStateType, IdsType, PizzaCartAddedType } from './types';
import { PizzaType } from '../pizza/types';
import { generateIdsForPizza } from '../../../utils/generate-ids-for-pizza';

const initialState: CartStateType = {
	pizzas: {},
	totalCount: 0,
	totalPrice: 0,
	ids: {},
	visitedPages: {},
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addPizza: (state, action: PayloadAction<PizzaCartAddedType>) => {
			const { pizza, pizzaCartId } = action.payload;

			if (state.pizzas[pizzaCartId]) {
				state.pizzas[pizzaCartId].count += 1;
			} else {
				state.pizzas[pizzaCartId] = { ...pizza, count: 1 };
			}
			state.totalPrice += action.payload.pizza.price;
			state.totalCount += 1;
		},

		incrementPizza: (state, action: PayloadAction<string>) => {
			const pizzaCartId = action.payload;
			state.pizzas[pizzaCartId].count += 1;
			state.totalCount += 1;
			state.totalPrice += state.pizzas[pizzaCartId].price;
		},

		decrementPizza: (state, action: PayloadAction<string>) => {
			const pizzaCartId = action.payload;

			state.pizzas[pizzaCartId].count -= 1;
			state.totalCount -= 1;
			state.totalPrice -= state.pizzas[pizzaCartId].price;
			if (state.pizzas[pizzaCartId].count === 0) {
				delete state.pizzas[pizzaCartId];
			}
		},

		deletePizzasById: (state, action: PayloadAction<string>) => {
			const pizzaCartId = action.payload;
			const pizzaInCart = state.pizzas[pizzaCartId];
			state.totalCount -= pizzaInCart.count;
			state.totalPrice -= pizzaInCart.price * pizzaInCart.count;
			delete state.pizzas[pizzaCartId];
		},

		deleteAllPizzas: (state) => {
			state.pizzas = {};
			state.totalCount = 0;
			state.totalPrice = 0;
		},

		addIds: (state, action: PayloadAction<PizzaType[]>) => {
			const ids: IdsType = {};
			action.payload.forEach((pizza) => {
				if (!state.ids[pizza.id]) {
					ids[pizza.id] = generateIdsForPizza(pizza.widths, pizza.sizes);
				}
			});
			state.ids = { ...state.ids, ...ids };
		},

		addVisitedPages: (state, action: PayloadAction<number>) => {
			const currentPageIndex = action.payload;
			state.visitedPages[currentPageIndex] = true;
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
