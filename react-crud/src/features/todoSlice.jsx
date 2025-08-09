import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [
    { title: "learn Redux", status: true }
  ]
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push({
        title: action.payload,
        status: false 
      });
    },
    remove: (state, action) => {
      state.value.splice(action.payload, 1);

    },
    update: (state, action) => {
      const { index, title, status } = action.payload;
      if (state.value[index]) {
        state.value[index] = { title, status };
      }
    },
  }
});

export const { add, remove, update } = todoSlice.actions;
export default todoSlice.reducer;
