import { useMutation } from "react-query";
import CreateHomeworkBody from "../data/homework/dto/CreateHomeworkBody";
import HomeworkApi from "../data/homework/homework.api";

const homeworkApi = new HomeworkApi();

export const useFindHomework = (courseId: number) => {
    return useMutation((lessonId: number) => {
        return homeworkApi.findByCourseIdAndLessonId(courseId, lessonId);
    })
}


export const useCreateHomework = (courseId: number, lessonId: number) => {
    return useMutation((body: CreateHomeworkBody) => {
        return homeworkApi.createByCourseId(courseId, lessonId, body);
    })
}


export const useDeleteHomework = (courseId: number) => {
    return useMutation((lessonId: number) => {
        return homeworkApi.deleteByCourseIdAndId(courseId, lessonId);
    })
}