import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Lazy-loaded components
const SignIn = lazy(() => import("./Page/Auth/SignIn"));
const Student_SignUp = lazy(() => import("./Page/Auth/Student_SignUp"));
const Instructor_SignUp = lazy(() => import("./Page/Auth/Instructor_SignUp"));
const Tutor_SignUp = lazy(() => import("./Page/Auth/Tutor_SignUp"));

// Client Pages - Individuals
const Landing = lazy(() => import("./Page/Client/Individuals/Landing"));
const Course = lazy(() => import("./Page/Client/Individuals/Course"));
const About = lazy(() => import("./Page/Client/Individuals/About"));
const Contact = lazy(() => import("./Page/Client/Individuals/Contact"));
const SingleCourse = lazy(() =>
  import("./Page/Client/Individuals/SingleCourse")
);
const Lesson = lazy(() => import("./Page/Client/Individuals/Lesson"));
const Profile = lazy(() => import("./Page/Client/Individuals/Profile"));
const Check = lazy(() => import("./Page/Client/Individuals/Check"));
const Instructor = lazy(() => import("./Page/Client/Individuals/Instructor"));
const InstructorDetail = lazy(() =>
  import("./Page/Client/Individuals/InstructorDetail")
);
const Tutor = lazy(() => import("./Page/Client/Individuals/Tutor"));
const TutorDetail = lazy(() => import("./Page/Client/Individuals/TutorDetail"));

// Client Pages - Businesses
const BusinessesLanding = lazy(() =>
  import("./Page/Client/Businesses/BusinessesLanding")
);
const Browser = lazy(() => import("./Page/Client/BusinessSide/Browser"));
const BrowserDetail = lazy(() =>
  import("./Page/Client/BusinessSide/BrowserDetail")
);
const EnrollEmployee = lazy(() =>
  import("./Page/Client/BusinessSide/EnrollEmployee")
);
const CompanyRegister = lazy(() =>
  import("./Page/Client/BusinessSide/CompanyRegister")
);
const CourseEnrolled = lazy(() =>
  import("./Page/Client/BusinessSide/CourseEnrolled")
);
const OrderDetail = lazy(() =>
  import("./Page/Client/BusinessSide/OrderDetail")
);
const BusinessContact = lazy(() =>
  import("./Page/Client/Businesses/BusinessContact")
);

// Client Pages - School, Government, Universities
const SchoolLanding = lazy(() => import("./Page/Client/School/SchoolLanding"));
const SchoolContact = lazy(() => import("./Page/Client/School/SchoolContact"));
const GovernmentLanding = lazy(() =>
  import("./Page/Client/Government/GovernmentLanding")
);
const GovernmentContact = lazy(() =>
  import("./Page/Client/Government/GovernmentContact")
);
const UniversitiesLanding = lazy(() =>
  import("./Page/Client/Universities/UniversitiesLanding")
);
const UniversitiesContact = lazy(() =>
  import("./Page/Client/Universities/UniversitiesContact")
);

// Instructor Pages
const Dashboards = lazy(() => import("./Page/Instructor/Dashboards"));
const Lists = lazy(() => import("./Page/Instructor/Lists"));
const Add = lazy(() => import("./Page/Instructor/Add"));
const AddDetail = lazy(() => import("./Page/Instructor/AddDetail"));
const ModifyCourse = lazy(() => import("./Page/Instructor/ModifyCourse"));
const QuizAdd = lazy(() => import("./Page/Instructor/QuizAdd"));
const QuizzesAdding = lazy(() => import("./Page/Instructor/QuizzesAdding"));
const InstructorProfile = lazy(() =>
  import("./Page/Instructor/InstructorProfile")
);
const InstructorSetting = lazy(() =>
  import("./Page/Instructor/InstructorSetting")
);
const CreateRoom = lazy(() => import("./Page/Instructor/CreateRoom"));
const Room = lazy(() => import("./Instructor/Room"));

// Admin Pages
const AdminDashboard = lazy(() => import("./Page/Admin/AdminDashboard"));
const AdminStudent = lazy(() => import("./Page/Admin/AdminStudent"));
const AdminTeacher = lazy(() => import("./Page/Admin/AdminTeacher"));
const AdminTutor = lazy(() => import("./Page/Admin/AdminTutor"));
const AdminReview = lazy(() => import("./Page/Admin/AdminReview"));
const AdminProfile = lazy(() => import("./Page/Admin/AdminProfile"));
const AdminCourse = lazy(() => import("./Page/Admin/AdminCourse"));
const AdminCourseDetail = lazy(() => import("./Page/Admin/AdminCourseDetail"));
const AdminContact = lazy(() => import("./Page/Admin/AdminContact"));
const AdminDetailTeacher = lazy(() =>
  import("./Page/Admin/AdminDetailTeacher")
);
const AdminDetailStudent = lazy(() =>
  import("./Page/Admin/AdminDetailStudent")
);
const AdminTransactionDetail = lazy(() =>
  import("./Page/Admin/AdminTransactionDetail")
);

// Other Pages
const Process = lazy(() => import("./Components/Process"));
const TutorDashboard = lazy(() => import("./Page/Tutor/TutorDashboard"));
const TutorJoinMeeting = lazy(() => import("./Page/Tutor/TutorJoinMeeting"));
const CreateCourse = lazy(() =>
  import("./Page/Client/BusinessSide/CreateCourse")
);
const AddBusinessCourse = lazy(() =>
  import("./Page/Client/BusinessSide/AddBusinessCourse")
);
const AddBusinessCourseDetail = lazy(() =>
  import("./Page/Client/BusinessSide/AddBusinessCourseDetail")
);
const BusinessDetailCourse = lazy(() =>
  import("./Page/Client/BusinessSide/BusinessDetailCourse")
);
const CompanyProfile = lazy(() =>
  import("./Page/Client/BusinessSide/CompanyProfile")
);
const CompanySetting = lazy(() =>
  import("./Page/Client/BusinessSide/CompanySetting")
);
const NotFound = lazy(() => import("./NotFound"));
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import TutorListCourse from "./Page/Tutor/TutorListCourse";
import TutorClassDetail from "./Page/Tutor/TutorClassDetail";
import TutorProfile from "./Page/Tutor/TutorProfile";
import AdminDetailTutor from "./Page/Admin/AdminDetailTutor";
import CompanyQuizAdd from "./Page/Client/BusinessSide/CompanyQuizAdd";
import CompanyQuizzesAdding from "./Page/Client/BusinessSide/CompanyQuizzesAdding";

function App() {
  const token = Cookies.get("token") || "guest";
  const decodedToken = token !== "guest" ? jwt_decode(token) : "guest";
  const role = decodedToken.role;

  return (
    <Suspense
      fallback={
        <div class="wrap">
          <div class="loading">
            <div class="bounceball"></div>
            <div class="textLoading">LOADING</div>
          </div>
        </div>
      }
    >
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/accounts/login"
          element={
            role === "tutorinstructor" ? (
              <Navigate to="/tutor/dashboard" />
            ) : role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : role === "company_owner" ? (
              <Navigate to="/lms-business/course-browser" />
            ) : role === "instructor" ? (
              <Navigate to="/instructor/dashboard" />
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path="/accounts/student"
          element={
            role === "tutorinstructor" ? (
              <Navigate to="/tutor/dashboard" />
            ) : role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : role === "company_owner" ? (
              <Navigate to="/lms-business/course-browser" />
            ) : role === "instructor" ? (
              <Navigate to="/instructor/dashboard" />
            ) : (
              <Student_SignUp />
            )
          }
        />
        <Route
          path="/accounts/instructor"
          element={
            role === "tutorinstructor" ? (
              <Navigate to="/tutor/dashboard" />
            ) : role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : role === "company_owner" ? (
              <Navigate to="/lms-business/course-browser" />
            ) : role === "instructor" ? (
              <Navigate to="/instructor/dashboard" />
            ) : (
              <Instructor_SignUp />
            )
          }
        />
        <Route
          path="/accounts/tutor"
          element={
            role === "tutorinstructor" ? (
              <Navigate to="/tutor/dashboard" />
            ) : role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : role === "company_owner" ? (
              <Navigate to="/lms-business/course-browser" />
            ) : role === "instructor" ? (
              <Navigate to="/instructor/dashboard" />
            ) : (
              <Tutor_SignUp />
            )
          }
        />

        {/* Client Routes - Individuals */}
        <Route
          path="/"
          element={
            role === "tutorinstructor" ? (
              <Navigate to="/tutor/dashboard" />
            ) : role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : role === "company_owner" ? (
              <Navigate to="/lms-business/course-browser" />
            ) : role === "instructor" ? (
              <Navigate to="/instructor/dashboard" />
            ) : (
              <Landing />
            )
          }
        />
        <Route
          path="/aboutus"
          element={
            role === "tutorinstructor" ? (
              <Navigate to="/tutor/dashboard" />
            ) : role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : role === "company_owner" ? (
              <Navigate to="/lms-business/course-browser" />
            ) : role === "instructor" ? (
              <Navigate to="/instructor/dashboard" />
            ) : (
              <About />
            )
          }
        />
        <Route
          path="/contactpage"
          element={
            role === "tutorinstructor" ? (
              <Navigate to="/tutor/dashboard" />
            ) : role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : role === "company_owner" ? (
              <Navigate to="/lms-business/course-browser" />
            ) : role === "instructor" ? (
              <Navigate to="/instructor/dashboard" />
            ) : (
              <Contact />
            )
          }
        />
        <Route
          path="/courses"
          element={
            role === "tutorinstructor" ? (
              <Navigate to="/tutor/dashboard" />
            ) : role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : role === "company_owner" ? (
              <Navigate to="/lms-business/course-browser" />
            ) : role === "instructor" ? (
              <Navigate to="/instructor/dashboard" />
            ) : (
              <Course />
            )
          }
        />
        <Route
          path="/CourseDetail/:slug"
          element={
            role === "tutorinstructor" ? (
              <Navigate to="/tutor/dashboard" />
            ) : role === "admin" ? (
              <Navigate to="/admin/dashboard" />
            ) : role === "company_owner" ? (
              <Navigate to="/lms-business/course-browser" />
            ) : role === "instructor" ? (
              <Navigate to="/instructor/dashboard" />
            ) : (
              <SingleCourse />
            )
          }
        />
        <Route
          path="/lesson/:slug"
          element={role === "user" ? <Lesson /> : <Navigate to="/" />}
        />
        <Route
          path="/account/profile"
          element={role === "user" ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/checkout/:slug/:id"
          element={role === "user" ? <Check /> : <Navigate to="/" />}
        />
        <Route path="/find/instructor" element={<Instructor />} />
        <Route path="/find/instructor/:id" element={<InstructorDetail />} />
        {/* <Route path="/find/tutor" element={<Tutor />} /> */}
        {/* <Route path="/find/tutor/:id" element={<TutorDetail />} /> */}

        {/* Client Routes - Businesses */}
        <Route
          path="/lms-business/course-browser"
          element={role === "company_owner" ? <Browser /> : <Navigate to="/" />}
        />
        <Route
          path="/lms-business/course-enrolled"
          element={
            role === "company_owner" ? <CourseEnrolled /> : <Navigate to="/" />
          }
        />
        <Route
          path="/lms-business/course-create"
          element={
            role === "company_owner" ? <CreateCourse /> : <Navigate to="/" />
          }
        />
        <Route
          path="/lms-business/add_course"
          element={
            role === "company_owner" ? (
              <AddBusinessCourse />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/lms-business/add_detail/:id"
          element={
            role === "company_owner" ? (
              <AddBusinessCourseDetail />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/lms-business/detail_courses/:id"
          element={
            role === "company_owner" ? (
              <BusinessDetailCourse />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/lms-business/course-detail/:id"
          element={
            role === "company_owner" ? <BrowserDetail /> : <Navigate to="/" />
          }
        />
        <Route
          path="/lms-business/course-detail/:id/enroll-employee"
          element={
            role === "company_owner" ? <EnrollEmployee /> : <Navigate to="/" />
          }
        />
        <Route
          path="/lms-business/course-detail/:id/enroll-employee/:oid"
          element={
            role === "company_owner" ? <OrderDetail /> : <Navigate to="/" />
          }
        />
        <Route
          path="/lms-business/employee-register"
          element={
            role === "company_owner" ? <CompanyRegister /> : <Navigate to="/" />
          }
        />
        <Route
          path="/lms-business/company-profile"
          element={
            role === "company_owner" ? <CompanyProfile /> : <Navigate to="/" />
          }
        />
        <Route
          path="/lms-business/company-setting"
          element={
            role === "company_owner" ? <CompanySetting /> : <Navigate to="/" />
          }
        />
         <Route
          path="/lms-business/detail_quiz/:id/:slug"
          element={role === "company_owner" ? <CompanyQuizAdd /> : <Navigate to="/" />}
        />
        <Route
          path="/lms-business/detail_quiz/:id/:slug/:type"
          element={
            role === "company_owner" ? <CompanyQuizzesAdding /> : <Navigate to="/" />
          }
        />

        {/* Client Routes - School, Government, Universities */}
        <Route path="/business" element={<BusinessesLanding />} />
        <Route path="/business/contact" element={<BusinessContact />} />
        <Route path="/school" element={<SchoolLanding />} />
        <Route path="/school/contact" element={<SchoolContact />} />
        <Route path="/government" element={<GovernmentLanding />} />
        <Route path="/government/contact" element={<GovernmentContact />} />
        <Route path="/university" element={<UniversitiesLanding />} />
        <Route path="/university/contact" element={<UniversitiesContact />} />

        {/* Instructor Routes */}
        <Route
          path="/instructor/dashboard"
          element={role === "instructor" ? <Dashboards /> : <Navigate to="/" />}
        />
        <Route
          path="/instructor/list_course"
          element={role === "instructor" ? <Lists /> : <Navigate to="/" />}
        />
        <Route
          path="/instructor/add_course"
          element={role === "instructor" ? <Add /> : <Navigate to="/" />}
        />
        <Route
          path="/instructor/room"
          element={role === "instructor" ? <CreateRoom /> : <Navigate to="/" />}
        />
        <Route
          path="/instructor/setting"
          element={
            role === "instructor" ? <InstructorSetting /> : <Navigate to="/" />
          }
        />
        <Route
          path="/kts/room/:roomID"
          element={
            role === "tutorinstructor" ||
            role === "user" ? (
              <Room />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/instructor/add_detail/:id"
          element={role === "instructor" ? <AddDetail /> : <Navigate to="/" />}
        />
        <Route
          path="/instructor/detail_courses/:id"
          element={
            role === "instructor" ? <ModifyCourse /> : <Navigate to="/" />
          }
        />
        <Route
          path="/instructor/detail_quiz/:id/:slug"
          element={role === "instructor" ? <QuizAdd /> : <Navigate to="/" />}
        />
        <Route
          path="/instructor/detail_quiz/:id/:slug/:type"
          element={
            role === "instructor" ? <QuizzesAdding /> : <Navigate to="/" />
          }
        />
        <Route
          path="/instructor/account"
          element={
            role === "instructor" ? <InstructorProfile /> : <Navigate to="/" />
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/student_list"
          element={role === "admin" ? <AdminStudent /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/student_detail/:id"
          element={
            role === "admin" ? <AdminDetailStudent /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/course_list"
          element={role === "admin" ? <AdminCourse /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/course_list/:id"
          element={
            role === "admin" ? <AdminCourseDetail /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/course_list/:id/chapters-lessons"
          element={
            role === "admin" ? <AdminCourseDetail /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/course_list/:id/enrollment-info"
          element={
            role === "admin" ? <AdminCourseDetail /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/course_list/:id/reviews-ratings"
          element={
            role === "admin" ? <AdminCourseDetail /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/contact_list"
          element={role === "admin" ? <AdminContact /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/teacher_list"
          element={role === "admin" ? <AdminTeacher /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/teacher_detail/:id"
          element={
            role === "admin" ? <AdminDetailTeacher /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/tutor_list"
          element={role === "admin" ? <AdminTutor /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/tutor_detail/:id"
          element={role === "admin" ? <AdminDetailTutor /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/transaction_list"
          element={role === "admin" ? <AdminReview /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/transaction/:id"
          element={
            role === "admin" ? <AdminTransactionDetail /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/account"
          element={role === "admin" ? <AdminProfile /> : <Navigate to="/" />}
        />

        {/* Other Routes */}
        <Route path="/process" element={<Process />} />
        <Route
          path="/tutor/dashboard"
          element={
            role === "tutorinstructor" ? (
              <TutorDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/tutor/list-course" element={<TutorListCourse />} />
        <Route path="/tutor/class-detail/:id" element={<TutorClassDetail />} />
        <Route path="/tutor/profile" element={<TutorProfile />} />
        <Route path="/tutor/meeting" element={<TutorJoinMeeting />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
