import { IsNotEmpty } from "class-validator";
import { LessonStatus } from "../../../models/Lesson";

export default class CreateLessonBody {
    moduleId: number;

    @IsNotEmpty({
        message: "toast.error.enter-name"
    })
    name: string;
    description: string;
    status: LessonStatus;
    packageIds: number[];
}