import Student from "../../student/models/Student";
import HomeworkSubmissionResource from "./HomeworkSubmissionResource";
import colors from "../../../config/theme/colors";

export default class HomeworkSubmission {
    homeworkId: number;
    studentId: number;
    courseId: number;
    student: Student;
    value?: string;
    status: HomeworkSubmissionStatus;
    triesCount: number;
    submittedAt: number;
    notes?: string;
    resources: HomeworkSubmissionResource[];


    static statusColor = (submission: HomeworkSubmission): string => {
        switch (submission.status) {
            case "ACCEPTED":
                return colors.highlight.green.base;
            case "PENDING":
                return colors.highlight.gray.dark;
            case "DECLINED":
                return colors.highlight.red.base;
        }
    }
}

export type HomeworkSubmissionStatus = "PENDING" | "ACCEPTED" | "DECLINED";