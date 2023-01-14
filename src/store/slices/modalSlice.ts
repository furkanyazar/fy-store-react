import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modalItems } from "../initialValues/modalItems";

export const modalSlice = createSlice({
  name: "modal",
  initialState: modalItems,
  reducers: {
    hideAllModals: (state) => {
      state.showLoginModal = false;
      state.showRegisterModal = false;
    },
    setShowLoginModal: (state, action: PayloadAction<boolean>) => {
      state.showLoginModal = action.payload;
    },
    setShowRegisterModal: (state, action: PayloadAction<boolean>) => {
      state.showRegisterModal = action.payload;
    },
  },
});

export const { hideAllModals, setShowLoginModal, setShowRegisterModal } = modalSlice.actions;

export default modalSlice.reducer;
