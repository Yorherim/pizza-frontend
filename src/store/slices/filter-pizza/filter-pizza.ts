import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FilterPizzaStateType, SortByType } from './types';
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
	},
});

export const {
	changeActiveCategoryId,
	changeCurrentPageIndex,
	changePagesCount,
	changeSortBy,
	changeSearch,
} = filterPizzaSlice.actions;

export default filterPizzaSlice.reducer;
