import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
    },
    reducers: {
        setUserProfile: (state, action) => {
            state = action.payload;
            return { ...state, isLoading: false };
        },
    },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
