import { useMutation } from "react-query";
import CourseApi from "../data/course/course-api";
import CreateCourseBody from "../data/course/dto/CreateCourseBody";
import EditCourseBody from "../data/course/dto/EditCourseBody";

const courseApi = new CourseApi();


export const useFindCourseRole = () => {
    return useMutation((courseId: number) => {
        return courseApi.findRoleById(courseId);
    })
}


export const useFindCourses = () => {
    return useMutation(() => {
        return courseApi.findAllByCourseId();
    })
}

export const useFindCourseSubscription = () => {
    return useMutation((courseId: number) => {
        return courseApi.findCourseSubscription(courseId);
    })
}


export const useEditCourse = (courseId: number) => {
    return useMutation((body: EditCourseBody) => {
        return courseApi.editCourse(courseId, body);
    });
}


export const useUploadBanner = (courseId: number) => {
    return useMutation((body: FormData) => {
        return courseApi.uploadBanner(courseId, body);
    })
}