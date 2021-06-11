import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            state.changed = true;
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.itemId === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    itemId: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            state.changed = true;
            const id = action.payload;
            const existingItem = state.items.find(item => item.itemId === id);
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.itemId !== id);
                state.totalQuantity--;
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
                state.totalQuantity--;
            }
        }
    }
})


export const cartActions = cartSlice.actions
export default cartSlice;