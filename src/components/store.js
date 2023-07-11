import { configureStore } from "@reduxjs/toolkit";
import cartSlice  from "./reducer";
const store = configureStore({
    reducer: {
        cart:cartSlice,
    }
})

export default store;