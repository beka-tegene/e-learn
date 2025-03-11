import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { InstructorRegister, Login, StudentRegister } from "../APIs/AuthApi";
import {
  setInstructorRegisterData,
  setLoginData,
  setRegisterData,
} from "../Hooks/AuthHook";
import {
  getAllCourse,
  getAllCourseById,
  setAllCourseById,
  setCourseEnroll,
  setPayment,
  setPaymentSantim,
  updateLessonProgress,
} from "../APIs/CourseApi";
import {
  getCourse,
  getCourseById,
  getPaymentData,
  getPaymentWithSantimData,
  setCourseData,
  setEnrollCourseData,
  setUpdateLessonProgressData,
} from "../Hooks/CourseHook";
import {
  getAllUser,
  getAllUserCourse,
  getAllUserCourseById,
  getAllUserInstructor,
} from "../APIs/UserApi";
import {
  getUser,
  getUserCourse,
  getUserCourseById,
  getUserInstructor,
} from "../Hooks/UserHook";
import { setOrderData } from "../Hooks/OrderHook";
import { createOrderId } from "../APIs/OrderApi";

export function* watchLMS() {
  yield takeLatest("auth/setLogin", fetchSetLogin);
  yield takeLatest("auth/setRegister", fetchSetRegister);
  yield takeLatest("auth/setInstructorRegister", fetchSetInstructorRegister);

  yield takeLatest("course/getCourseData", fetchGetCourse);
  yield takeLatest("course/getCourseByIdData", fetchGetCourseById);
  yield takeLatest("course/setEnrollCourse", fetchSetEnrollCourse);
  yield takeLatest("course/getPayment", fetchGetPayment);
  yield takeLatest("course/setCourse", fetchSetCourse);
  yield takeLatest("course/getPaymentWithSantim", fetchGetPaymentSantim);
  yield takeLatest(
    "course/setUpdateLessonProgress",
    fetchSetUpdateLessonProgress
  );

  yield takeLatest("user/getUserData", fetchGetUser);
  yield takeLatest("user/getUserInstructorData", fetchGetUsersInstructor);
  yield takeLatest("user/getUserCourseData", fetchGetUserCourse);
  yield takeLatest("user/getUserCourseByIdData", fetchGetUserCourseById);

  yield takeLatest("order/setOrder", fetchSetOrder);
}

function* fetchSetLogin(action) {
  try {
    yield call(Login, action.payload.data);
    yield setLoginData();
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchSetRegister(action) {
  try {
    yield call(StudentRegister, action.payload.data);
    yield setRegisterData();
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchSetInstructorRegister(action) {
  try {
    yield call(InstructorRegister, action.payload.data);
    yield setInstructorRegisterData();
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchGetCourse() {
  try {
    const getData = yield call(getAllCourse);
    yield put(getCourse(getData));
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchSetEnrollCourse(action) {
  try {
    yield call(setCourseEnroll, action.payload.data);
    yield setEnrollCourseData();
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchGetPayment(action) {
  try {
    yield call(setPayment, action.payload.data);
    yield getPaymentData();
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchGetPaymentSantim(action) {
  try {
    yield call(setPaymentSantim, action.payload.data);
    yield getPaymentWithSantimData();
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchGetUser(action) {
  try {
    const getData = yield call(getAllUser, action.payload.data);
    yield put(getUser(getData));
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchSetUpdateLessonProgress(action) {
  try {
    yield call(updateLessonProgress, action.payload.data);
    yield setUpdateLessonProgressData();
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchGetUserCourse(action) {
  try {
    const getData = yield call(getAllUserCourse, action.payload.data);
    yield put(getUserCourse(getData));
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchGetUserCourseById(action) {
  try {
    const getData = yield call(getAllUserCourseById, action.payload.data);
    yield put(getUserCourseById(getData));
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchSetOrder(action) {
  try {
    const getData = yield call(createOrderId, action.payload.data);
    yield put(setOrderData(getData));
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchGetCourseById(action) {
  try {
    const getData = yield call(getAllCourseById, action.payload.data);
    yield put(getCourseById(getData));
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchGetUsersInstructor() {
  try {
    const getData = yield call(getAllUserInstructor);
    yield put(getUserInstructor(getData));
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* fetchSetCourse(action) {
  try {
    yield call(setAllCourseById, action.payload);
    yield setCourseData();
  } catch (error) {
    toast.error(error.response.data.error);
  }
}
