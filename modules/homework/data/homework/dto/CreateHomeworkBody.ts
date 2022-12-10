import { IsNotEmpty } from "class-validator";

export default class CreateHomeworkBody {

    @IsNotEmpty({
        message: "toast.error.enter-name"
    })
    value: string;

    deadlineAt?: number;
}