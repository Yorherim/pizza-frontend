import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	init: false,
	firstRender: true,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		isInitialized: (state) => {
			state.init = true;
		},
		cancelFirstRender: (state) => {
			state.firstRender = false;
		},
	},
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
