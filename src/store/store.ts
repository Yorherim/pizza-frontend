import { configureStore } from '@reduxjs/toolkit';
import { appReducer, filterPizzaReducer, pizzaReducer } from './slices';

export const store = configureStore({
	reducer: {
		pizza: pizzaReducer,
		filterPizza: filterPizzaReducer,
		app: appReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
