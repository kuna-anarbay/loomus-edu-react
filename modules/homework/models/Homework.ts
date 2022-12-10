import HomeworkSubmission from "./HomeworkSubmission";
import HomeworkResource from "./HomeworkResource";

export default class Homework {
    id: number;
    courseId: number;
    value: string;
    deadlineAt?: number;
    resources: HomeworkResource[];
    submission?: HomeworkSubmission;

    static empty = (courseId: number, lessonId: number): Homework => {
        return {
            courseId: courseId,
            id: lessonId,
            value: "",
            resources: []
        }
    }
}