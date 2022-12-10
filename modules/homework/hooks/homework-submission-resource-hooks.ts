import { useMutation } from "react-query";
import HomeworkSubmissionResourceApi from "../data/homework-submission-resource/homework-submission-resource-api";

const submissionResourceApi = new HomeworkSubmissionResourceApi();

export const useGetHomeworkSubmissionResourceUrl = (courseId: number, homeworkId: number) => {
    return useMutation((resourceId: number) => {
        return submissionResourceApi.getDownloadLink(courseId, homeworkId, resourceId)
    })
}


export const useUploadHomeworkSubmissionResource = (courseId: number, homeworkId: number, onUploadProgress: (progress: number) => void) => {
    return useMutation((file: File) => {
        return submissionResourceApi.upload(courseId, homeworkId, file, onUploadProgress)
    })
}


export const useDeleteHomeworkSubmissionResource = (courseId: number, homeworkId: number) => {
    return useMutation((resourceId: number) => {
        return submissionResourceApi.deleteResource(courseId, homeworkId, resourceId)
    })
}