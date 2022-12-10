import { IsNotEmpty } from "class-validator";

export default class CreateCourseBody {

    @IsNotEmpty({
        message: "toast.error.enter-name"
    })
    name: string;

    description?: string;

    phone: string;

}