import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterPizzaStateType, QsParamsType, SortByType } from './types';
import { sortTitles } from '../../../data';

const initialState: FilterPizzaStateType = {
	activeCategoryId: 0,
	sortBy: sortTitles.rating,
	currentPageIndex: 0,
	pagesCount: 0,
	search: '',
};

export const filterPizzaSlice = createSlice({
	name: 'filterPizza',
	initialState,
	reducers: {
		changeActiveCategoryId: (state, action: PayloadAction<number>) => {
			state.activeCategoryId = action.payload;
		},
		changeSortBy: (state, action: PayloadAction<SortByType>) => {
			state.sortBy = action.payload;
		},
		changeCurrentPageIndex: (state, action: PayloadAction<number>) => {
			state.currentPageIndex = action.payload;
		},
		changePagesCount: (state, action: PayloadAction<number>) => {
			state.pagesCount = action.payload;
		},
		changeSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setUrlParams: (state, action: PayloadAction<QsParamsType>) => {
			const payload = action.payload;
			if (payload.category) state.activeCategoryId = Number(payload.category);
			if (payload.sortBy) state.sortBy = sortTitles[payload.sortBy];
			if (payload.page) state.currentPageIndex = Number(payload.page) - 1;
			if (payload.search) state.search = payload.search;
		},
	},
});

export const filterPizzaActions = filterPizzaSlice.actions;

export default filterPizzaSlice.reducer;
