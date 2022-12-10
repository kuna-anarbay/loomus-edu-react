import { LessonStatus } from "../../../models/Lesson";

export default interface EditLessonBody {
    name: string;
    description: string;
    status: LessonStatus;
}