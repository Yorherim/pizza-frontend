import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FetchPizzasActionPayloadType, PizzaStateType, PizzaType, StatusType } from './types';
import axios from 'axios';
import { RootState } from '../../store';
import { cartActions } from '../cart/cart';
import { filterPizzaActions } from '../filter-pizza/filter-pizza';

export const pizzaThunks = {
	fetchPizzas: createAsyncThunk(
		'pizza/fetchPizzas',
		async (
			{
				queryString,
				currentPageIndex,
				checkCurrentFiltersWithPrevFilteres,
			}: FetchPizzasActionPayloadType,
			thunkAPI,
		) => {
			const state = thunkAPI.getState() as RootState;
			const dispatch = thunkAPI.dispatch;

			const pizzas: PizzaType[] = await (
				await axios.get(`${process.env.REACT_APP_API_URL}?${queryString}`, { timeout: 5000 })
			).data;

			if (!state.cart.visitedPages[currentPageIndex] || !checkCurrentFiltersWithPrevFilteres) {
				dispatch(cartActions.addIds(pizzas));
				dispatch(cartActions.addVisitedPages(currentPageIndex));
			}

			// бэкенд не присылает количество всех страниц, поэтому захардкодим
			const pagesCount = Math.ceil(10 / 4);
			dispatch(filterPizzaActions.changePagesCount(pagesCount));

			return pizzas;
		},
	),

	fetchPizzaById: createAsyncThunk('pizza/fetchPizzaById', async (pizzaId: string, thunkAPI) => {
		const pizza: PizzaType = await (
			await axios.get(`${process.env.REACT_APP_API_URL}/${pizzaId}`, { timeout: 5000 })
		).data;

		return pizza;
	}),
};

const initialState: PizzaStateType = {
	pizzas: [],
	status: 'loading',
	currentPizzaInfo: {} as PizzaType,
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setPizzas: (state, action: PayloadAction<PizzaType[]>) => {
			state.pizzas = action.payload;
		},
		changeLoading: (state, action: PayloadAction<StatusType>) => {
			state.status = action.payload;
		},
	},
	extraReducers: (builder) => {
		// fetch pizzas
		builder.addCase(pizzaThunks.fetchPizzas.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(
			pizzaThunks.fetchPizzas.fulfilled,
			(state, action: PayloadAction<PizzaType[]>) => {
				state.pizzas = action.payload;
				state.status = 'success';
			},
		);
		builder.addCase(pizzaThunks.fetchPizzas.rejected, (state) => {
			state.status = 'rejected';
			state.pizzas = [];
		});

		// fetch pizza
		builder.addCase(pizzaThunks.fetchPizzaById.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(
			pizzaThunks.fetchPizzaById.fulfilled,
			(state, action: PayloadAction<PizzaType>) => {
				state.currentPizzaInfo = action.payload;
				state.status = 'success';
			},
		);
		builder.addCase(pizzaThunks.fetchPizzaById.rejected, (state) => {
			state.status = 'rejected';
			state.currentPizzaInfo = {} as PizzaType;
		});
	},
});

export const pizzaActions = pizzaSlice.actions;

export default pizzaSlice.reducer;
