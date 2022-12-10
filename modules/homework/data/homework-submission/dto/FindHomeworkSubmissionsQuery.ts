import { HomeworkSubmissionStatus } from "../../../models/HomeworkSubmission";

export default class FindHomeworkSubmissionsQuery {
    status: HomeworkSubmissionStatus | null;
    page: number;
    size: number;
}