import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export default class CreateStudentBody {
    packageId: number;

    @IsNotEmpty({
        message: "toast.error.enter-name"
    })
    firstName: string;
    lastName?: string;

    @IsPhoneNumber("KZ", {
        message: "toast.error.enter-phone"
    })
    phone: string;
    isActive: boolean;
}