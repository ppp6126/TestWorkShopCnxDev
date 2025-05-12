import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : false
}
export const checkLoginSlice = createSlice({
    name: 'ckLogin',
    initialState,
    reducers:{
        checkLogin : (state,action) =>{
            // state.value = action.payload;
            return {
                ...state,
                isLoggedIn: action.payload,
            };
            //
        },
    }
})

export const { checkLogin } = checkLoginSlice.actions;
export default checkLoginSlice.reducer;