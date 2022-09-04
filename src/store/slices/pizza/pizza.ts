import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PizzaStateType, PizzaType } from './types';

const initialState: PizzaStateType = {
	pizzas: [],
	loading: false,
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setPizzas: (state, action: PayloadAction<PizzaType[]>) => {
			state.pizzas = action.payload;
		},

		changeLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const { setPizzas, changeLoading } = pizzaSlice.actions;

export default pizzaSlice.reducer;
