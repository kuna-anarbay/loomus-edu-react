import { HomeworkSubmissionStatus } from "../../../models/HomeworkSubmission";

export default class ReplySubmissionBody {
    status: HomeworkSubmissionStatus;
    notes?: string;
}