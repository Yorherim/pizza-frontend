import { configureStore } from '@reduxjs/toolkit';
import { filterPizzaReducer, pizzaReducer } from './slices';

export const store = configureStore({
	reducer: {
		pizza: pizzaReducer,
		filterPizza: filterPizzaReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
