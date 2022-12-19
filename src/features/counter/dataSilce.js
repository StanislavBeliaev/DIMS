import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'fulldata',
    initialState: {
        isLoading: true,
    },
    reducers: {
        dataLoadedSuccess: (state, action) => {
            state = action.payload;
            return { ...state, isLoading: false };
        },
    },
});

export const { dataLoadedSuccess } = dataSlice.actions;
export default dataSlice.reducer;
