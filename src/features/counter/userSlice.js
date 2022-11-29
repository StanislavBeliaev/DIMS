import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUserProfile: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
