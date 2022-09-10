import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectPizzas = (state: RootState) => state.pizza.pizzas;

export const selectStatus = (state: RootState) => state.pizza.status;

export const selectCurrentPizza = (state: RootState) => state.pizza.currentPizzaInfo;

export const selectPizzaById = (id: string) => (state: RootState) =>
	state.pizza.pizzas.find((pizza) => pizza.id === id);
