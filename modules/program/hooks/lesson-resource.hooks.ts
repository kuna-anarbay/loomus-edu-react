import { useMutation } from "react-query";
import LessonResourceApi from "../data/lesson-resource/lesson-resouce.api";

const resourceApi = new LessonResourceApi();

export const useGetResourceDownloadLink = (courseId: number, lessonId: number) => {
    return useMutation((resourceId: number) => {
        return resourceApi.getDownloadLink(courseId, lessonId, resourceId);
    })
}

export const useUploadResource = (courseId: number, lessonId: number, onUploadProgress: (progress: number) => void) => {
    return useMutation((file: File) => {
        const formData = new FormData()
        formData.set("file", file);
        formData.set("name", file.name);
        return resourceApi.upload(courseId, lessonId, file, onUploadProgress);
    })
}

export const useDeleteResource = (courseId: number, lessonId: number) => {
    return useMutation((resourceId: number) => {
        return resourceApi.deleteById(courseId, lessonId, resourceId);
    })
}