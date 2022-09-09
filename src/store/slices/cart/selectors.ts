import { RootState } from './../../store';

export const selectTotalCount = (state: RootState) => state.cart.totalCount;

export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;

export const selectPizzas = (state: RootState) => state.cart.pizzas;

export const selectCart = (state: RootState) => state.cart;
