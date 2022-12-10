import CoursePackageApi from "../data/course-package/course-package.api";
import { useMutation } from "react-query";
import CreateCoursePackageBody from "../../course/data/course-package/dto/CreateCoursePackageBody";
import EditCoursePackageBody from "../../course/data/course-package/dto/EditCoursePackageBody";

const coursePackageApi = new CoursePackageApi();

export const useFindCoursePackages = () => {
    return useMutation((courseId: number) => {
        return coursePackageApi.findCoursePackages(courseId);
    })
}


export const useCreateCoursePackage = (courseId: number) => {
    return useMutation((body: CreateCoursePackageBody) => {
        return coursePackageApi.createCoursePackage(courseId, body);
    })
}


export const useEditCoursePackage = (courseId: number, packageId: number) => {
    return useMutation((body: EditCoursePackageBody) => {
        return coursePackageApi.editCoursePackage(courseId, packageId, body);
    })
}


export const useDeleteCoursePackage = (courseId: number) => {
    return useMutation((packageId: number) => {
        return coursePackageApi.deleteCoursePackage(courseId, packageId);
    })
}