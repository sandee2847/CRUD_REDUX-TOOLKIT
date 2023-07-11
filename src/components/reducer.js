import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
    },
    reducers: {
        ADD: (state, action) => {
            state.cart = action.payload
        },
        CREATE: (state, action) => {
            const findProduct = state.cart.find(item => item.id === +action.payload.id);
            console.log(findProduct);
            if (findProduct) {
                alert("Id is alredy presenet!")
            }
            else {
                state.cart = [...state.cart, action.payload]
            }
        },
        DELETE: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },
        UPDATE: (state, action) => {
            const selectedId = +action.payload.id;
            const selectedOption = action.payload.selectedOption;
            const updateValue = action.payload.updateValue;
            console.log("data", selectedId, selectedOption, updateValue);
            console.log(state.cart[1])
            const productIndex = state.cart.findIndex((item) => item.id === selectedId);
            switch (selectedOption) {
                case 'thumbnail':
                    state.cart[productIndex].thumbnail = updateValue;
                    break;
                case 'id':
                    console.log("id of data",state.cart[productIndex].id)
                    state.cart[productIndex].id = +updateValue;
                    console.log("id of data after change",state.cart[productIndex].id)
                    break;
                case 'title':
                    state.cart[productIndex].title = updateValue;
                    break;
                case 'price':
                    state.cart[productIndex].price = +updateValue;
                    break;
                case 'rating':
                    state.cart[productIndex].rating = +updateValue;
                    break;
                case 'stock':
                    state.cart[productIndex].stock = +updateValue;
                    break;
                default:
                    return state.cart
            }
        },
        REPLACE: (state, action) => {
            const productId = action.payload.id;
            const productIndex = state.cart.findIndex((item) => item.id === +productId);
            state.cart[productIndex] = action.payload.formData;
        }
    }
})

export const { ADD, CREATE, DELETE, UPDATE, REPLACE } = cartSlice.actions;
export default cartSlice.reducer;