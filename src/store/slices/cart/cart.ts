import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CartStateType, IdsType, PizzaCartAddedType, PizzaCartType } from './types';
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
	name: 'pizza',
	initialState,
	reducers: {
		addPizzaInCart: (state, action: PayloadAction<PizzaCartAddedType>) => {
			const { pizza, pizzaCartId } = action.payload;

			if (state.pizzas[pizzaCartId]) {
				state.pizzas[pizzaCartId].count += 1;
			} else {
				state.pizzas[pizzaCartId] = { ...pizza, count: 1 };
			}
			state.totalPrice += action.payload.pizza.price;
			state.totalCount += 1;
		},

		incrementPizzaInCart: (state, action: PayloadAction<string>) => {
			const pizzaCartId = action.payload;
			state.pizzas[pizzaCartId].count += 1;
			state.totalCount += 1;
			state.totalPrice += state.pizzas[pizzaCartId].price;
		},

		decrementPizzaInCart: (state, action: PayloadAction<string>) => {
			const pizzaCartId = action.payload;

			state.pizzas[pizzaCartId].count -= 1;
			state.totalCount -= 1;
			state.totalPrice -= state.pizzas[pizzaCartId].price;
			if (state.pizzas[pizzaCartId].count === 0) {
				delete state.pizzas[pizzaCartId];
			}
		},

		deletePizzasByIdInCart: (state, action: PayloadAction<string>) => {
			const pizzaCartId = action.payload;
			const pizzaInCart = state.pizzas[pizzaCartId];
			state.totalCount -= pizzaInCart.count;
			state.totalPrice -= pizzaInCart.price * pizzaInCart.count;
			delete state.pizzas[pizzaCartId];
		},

		deleteAllPizzasInCart: (state) => {
			state.pizzas = {};
			state.totalCount = 0;
			state.totalPrice = 0;
		},

		addIds: (state, action: PayloadAction<PizzaType[]>) => {
			const ids: IdsType = {};
			action.payload.forEach((pizza) => {
				ids[pizza.id] = generateIdsForPizza(pizza.widths, pizza.sizes);
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
