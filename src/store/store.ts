import { configureStore } from '@reduxjs/toolkit';
import { appReducer, cartReducer, filterPizzaReducer, pizzaReducer } from './slices';

export const store = configureStore({
	reducer: {
		pizza: pizzaReducer,
		filterPizza: filterPizzaReducer,
		app: appReducer,
		cart: cartReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
