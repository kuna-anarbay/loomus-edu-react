import { useMutation } from "react-query";
import LessonApi from "../data/lesson/lesson.api";
import CreateLessonBody from "../data/lesson/dto/CreateLessonBody";
import EditLessonBody from "../data/lesson/dto/EditLessonBody";
import ReorderLessonBody from "../data/lesson/dto/ReorderLessonBody";

const lessonApi = new LessonApi();


export const useCreateLesson = (courseId: number) => {
    return useMutation((body: CreateLessonBody) => {
        return lessonApi.createByCourseId(courseId, body);
    })
}


export const useFindLesson = (courseId: number) => {
    return useMutation((lessonId: number) => {
        return lessonApi.findByCourseIdAndId(courseId, lessonId);
    })
}


export const useEditLesson = (courseId: number, lessonId: number) => {
    return useMutation((body: EditLessonBody) => {
        return lessonApi.editByCourseId(courseId, lessonId, body);
    })
}


export const useReorderLesson = (courseId: number) => {
    return useMutation(({ lessonId, body }: { lessonId: number, body: ReorderLessonBody }) => {
        return lessonApi.reorderByCourseIdAndId(courseId, lessonId, body);
    })
}


export const useDeleteLesson = (courseId: number) => {
    return useMutation((lessonId: number) => {
        return lessonApi.deleteByCourseIdAndId(courseId, lessonId);
    })
}