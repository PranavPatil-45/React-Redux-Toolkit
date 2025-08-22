    import { createSlice } from "@reduxjs/toolkit";

    const stocksSlice = createSlice({
    name: "stocks",
    initialState: [],
    reducers: {
        addStock: (state, action) => {
        state.push(action.payload);
        },
        updateStock: (state, action) => {
        const index = state.findIndex(stock => stock.id === action.payload.id);
        if (index !== -1) state[index] = action.payload;
        },
        deleteStock: (state, action) => {
        return state.filter(stock => stock.id !== action.payload);
        }
    }
    });

    export const { addStock, updateStock, deleteStock } = stocksSlice.actions;
    export default stocksSlice.reducer;
