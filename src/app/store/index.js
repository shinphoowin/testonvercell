"use client";
import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import coursesReducer from "./coursesSlice";
import quicklearnVideosSliceReducer from "./quicklearnVideosSlice";
import courseReducer from "./courseSlice";
import myPurchasedCoursesSliceReducer from "./myPurchasedCoursesSlice";
import assignedClassesSliceReducer from "./assignedClassesSlice";
import otocoursesSliceReducer from "./oTocouresSlice";
import purchasedCourseSliceReducer from "./purchasedCourseSlice";

export const store = configureStore({
  reducer: {
    authData: authSliceReducer,
    coursesData: coursesReducer,
    quickLearnVideosData: quicklearnVideosSliceReducer,
    courseData: courseReducer,
    myPurchasedCoursesData: myPurchasedCoursesSliceReducer,
    assignedCourseOClassData: assignedClassesSliceReducer,
    otocoursesData: otocoursesSliceReducer,
    purchasedcourseData: purchasedCourseSliceReducer
  },
});
