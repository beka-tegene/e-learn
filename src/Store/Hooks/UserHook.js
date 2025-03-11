import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OutputUsers: [],
  isLoading: false,
  OutputUserCourses: [],
  OutputUserCoursesById: [],
  OutputUsersInstructor: [],
};

const UserHook = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserData(state) {},
    getUser(state, action) { 
      state.OutputUsers = action.payload;
    },
    getUserInstructorData(state) {},
    getUserInstructor(state, action) {
      state.OutputUsersInstructor = action.payload;
    },
    getUserCourseData(state) {},
    getUserCourse(state, action) {
      state.OutputUserCourses = action.payload;
    },
    getUserCourseByIdData(state) {},
    getUserCourseById(state, action) {
      state.OutputUserCoursesById = action.payload;
    },
  },
});

export const {
  getUserData,
  getUser,
  getUserCourseData,
  getUserCourse,
  getUserCourseByIdData,
  getUserCourseById,
  getUserInstructorData,
  getUserInstructor,
} = UserHook.actions;

export default UserHook.reducer;
