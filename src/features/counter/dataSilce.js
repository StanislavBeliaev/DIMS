import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'fulldata',
    initialState: {},
    reducers: {
        dataLoadedSuccess: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

export const { dataLoadedSuccess } = dataSlice.actions;
export default dataSlice.reducer;
