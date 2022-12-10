import { useMutation } from "react-query";
import LessonVideoApi from "../data/lesson-video/lesson-video.api";
import LessonVideo from "../models/LessonVideo";
import CreateLessonVideoBody from "../data/lesson-video/dto/CreateLessonVideoBody";

const videoApi = new LessonVideoApi();

export const useCreateLessonVideo = (courseId: number, lessonId: number) => {
    return useMutation((body: CreateLessonVideoBody) => {
        return videoApi.createByCourseId(courseId, lessonId, body);
    })
}

export const useUploadLessonVideo = (courseId: number, lessonId: number, onUploadProgress: (progress: number) => void, onSuccess: (video: LessonVideo) => void) => {
    return useMutation((file: File) => {
        return videoApi.upload(courseId, lessonId, file, onUploadProgress, onSuccess);
    })
}

export const useDeleteLessonVideo = (courseId: number) => {
    return useMutation((lessonId: number) => {
        return videoApi.deleteById(courseId, lessonId);
    })
}