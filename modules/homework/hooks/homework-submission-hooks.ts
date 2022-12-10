import { useMutation } from "react-query";
import HomeworkHomeworkSubmissionApi from "../data/homework-submission/homework-submission-api";
import FindHomeworkSubmissionsQuery from "../data/homework-submission/dto/FindHomeworkSubmissionsQuery";
import ReplySubmissionBody from "../data/homework-submission/dto/ReplySubmissionBody";
import CreateSubmissionBody from "../data/homework-submission/dto/CreateSubmissionBody";

const submissionApi = new HomeworkHomeworkSubmissionApi();

export const useGetHomeworkSubmissions = (courseId: number, homeworkId: number) => {
    return useMutation((query: FindHomeworkSubmissionsQuery) => {
        return submissionApi.getSubmissions(courseId, homeworkId, query)
    })
}


export const useSubmitHomework = (courseId: number, homeworkId: number) => {
    return useMutation((body: CreateSubmissionBody) => {
        return submissionApi.submitSubmission(courseId, homeworkId, body)
    })
}


export const useReplyHomeworkSubmission = (courseId: number, homeworkId: number, submissionId: number) => {
    return useMutation((body: ReplySubmissionBody) => {
        return submissionApi.replySubmission(courseId, homeworkId, submissionId, body)
    })
}



export const useGetHomeworkSubmissionDownloadLink = (courseId: number, homeworkId: number) => {
    return useMutation((submissionId: number) => {
        return submissionApi.getDownloadLink(courseId, homeworkId, submissionId);
    })
}