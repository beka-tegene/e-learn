import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InputOrder: [],
  OutputOrder: [],
};

const OrderHook = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setOrderData(state, action) {
      state.OutputOrder = action.payload;
    },
    setOrder(state, action) {
      state.isLoading = true;
      const newData = action.payload;
      state.InputOrder.push({
        id: newData.id,
      });
    },
  },
});

export const { setOrderData, setOrder } = OrderHook.actions;

export default OrderHook.reducer;
