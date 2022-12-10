import PackageLessonRelationApi from "../data/package-lesson-relation/package-lesson-relation.api";
import { useMutation } from "react-query";

const coursePackageRelationApi = new PackageLessonRelationApi();

export const useFindPackageLessons = (courseId: number) => {
    return useMutation((packageId: number) => {
        return coursePackageRelationApi.findPackageLessons(courseId, packageId);
    })
}


export const useCreatePackageLessonRelation = (courseId: number, lessonId: number) => {
    return useMutation((packageId: number) => {
        return coursePackageRelationApi.createPackageCourseRelation(courseId, packageId, lessonId);
    })
}


export const useDeletePackageLessonRelation = (courseId: number, lessonId: number) => {
    return useMutation((packageId: number) => {
        return coursePackageRelationApi.deletePackageCourseRelation(courseId, packageId, lessonId);
    })
}