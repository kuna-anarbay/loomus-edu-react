import { IsNotEmpty } from "class-validator";

export default class CreateCoursePackageBody {

    @IsNotEmpty({
        message: "toast.error.enter-name"
    })
    name: string;

    homeworkAvailable: boolean;
}