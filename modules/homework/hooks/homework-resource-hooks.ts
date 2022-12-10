import { useMutation } from "react-query";
import HomeworkResourceApi from "../data/homework-resource/homework-resource-api";

const homeworkResourceApi = new HomeworkResourceApi();

export const useGetHomeworkResourceUrl = (courseId: number, homeworkId: number) => {
    return useMutation((resourceId: number) => {
        return homeworkResourceApi.getDownloadLink(courseId, homeworkId, resourceId)
    })
}


export const useUploadHomeworkResource = (courseId: number, homeworkId: number, onUploadProgress: (progress: number) => void) => {
    return useMutation((file: File) => {
        return homeworkResourceApi.upload(courseId, homeworkId, file, onUploadProgress)
    })
}


export const useDeleteHomeworkResource = (courseId: number, homeworkId: number) => {
    return useMutation((resourceId: number) => {
        return homeworkResourceApi.deleteResource(courseId, homeworkId, resourceId)
    })
}