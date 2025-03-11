import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InputLogin: [],
  isLoading: false,
  InputRegister: [],
  InputInstructorRegister: [],
};

const AuthHook = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLoginData(state) {
      state.isLoading = false;
    },
    setLogin(state, action) {
      state.isLoading = true;
      const newData = action.payload;
      state.InputLogin.push({
        email: newData.email,
        password: newData.password,
      });
    },
    setRegisterData(state) {},
    setRegister(state, action) {
      state.isLoading = true;
      const newData = action.payload;
      state.InputRegister.push({
        fullname: newData.fullname,
        phonenumber: newData.phonenumber,
        email: newData.email,
        password: newData.password,
      });
    },
    setInstructorRegisterData(state) {},
    setInstructorRegister(state, action) {
      state.isLoading = true;
      const newData = action.payload;
      state.InputInstructorRegister.push({
        userName: newData.userName,
        firstName: newData.firstName,
        lastName: newData.lastName,
        phoneNumber: newData.phoneNumber,
        companyName: newData.companyName,
        email: newData.email,
        password: newData.password,
        idCard: newData.idCard,
        instructorLicense : newData.instructorLicense,
        Location : newData.Location,
        Experience : newData.Experience,
        Gender : newData.Gender,
      });
    },
  },
});

export const {
  setLoginData,
  setLogin,
  setRegisterData,
  setRegister,
  setInstructorRegisterData,
  setInstructorRegister,
} = AuthHook.actions;

export default AuthHook.reducer;
