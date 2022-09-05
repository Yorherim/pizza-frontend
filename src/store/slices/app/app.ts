import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	init: false,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		isInitialized: (state) => {
			state.init = true;
		},
	},
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
