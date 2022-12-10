import NetworkService from "../../../../utils/data/network-service";
import HomeworkSubmission from "../../models/HomeworkSubmission";
import FindHomeworkSubmissionsQuery from "./dto/FindHomeworkSubmissionsQuery";
import ReplySubmissionBody from "./dto/ReplySubmissionBody";
import Paginate from "../../../../utils/data/Paginate";
import CreateSubmissionBody from "./dto/CreateSubmissionBody";

export default class HomeworkSubmissionApi {

    private service = new NetworkService();

    getSubmissions = (courseId: number, homeworkId: number, query: FindHomeworkSubmissionsQuery) =>
        this.service.get<Paginate<HomeworkSubmission>>(`/v1/course/${courseId}/homework/${homeworkId}/submission`, query);


    submitSubmission = (courseId: number, homeworkId: number, body: CreateSubmissionBody) =>
        this.service.post<HomeworkSubmission>(`/v1/course/${courseId}/homework/${homeworkId}/submission`, body);


    replySubmission = (courseId: number, homeworkId: number, submissionId: number, body: ReplySubmissionBody) =>
        this.service.put(`/v1/course/${courseId}/homework/${homeworkId}/submission/${submissionId}`, body);


    getDownloadLink = async (courseId: number, homeworkId: number, submissionId: number) =>
        this.service.get<string>(`/v1/course/${courseId}/homework/${homeworkId}/submission/${submissionId}/download-url`);

}