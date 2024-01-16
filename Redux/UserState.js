import { createSlice } from "@reduxjs/toolkit";
import Faucet from "@/Contract/Faucet.json";



const initialState = {
    user: {
        address: "",
        faucetInstance : Faucet,
    },
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLoginDetails: (state, action) => {
            state.user = action.payload;
        },
        setSignOutState: (state) => {
            state.user.address = "";
        },
    },
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;
export const selectUser = (state) => state.UserState.user;
export default userSlice.reducer;