import { createSlice } from "@reduxjs/toolkit";

const cartCourseSlice = createSlice({
    name: "cartCourse",
    initialState: {
        products: [],
        quantity:0,
        total: 0,
    },
    reducers: {
        addCourseProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.prix2 * action.payload.quantity;        },

    clear: (state) => {
            state.quantity = 0;
            state.products=[];
            state.total = 0;       },
    },
});

export const { addCourseProduct,clear } = cartCourseSlice.actions;
export default cartCourseSlice.reducer;
