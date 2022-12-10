import { IsNotEmpty } from "class-validator";

export default class CreateModuleBody {
    @IsNotEmpty({
        message: "toast.error.enter-name"
    })
    name: string;
}