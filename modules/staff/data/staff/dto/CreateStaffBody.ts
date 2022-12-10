import { CourseStaffRole } from "../../../models/Staff";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export default class CreateStaffBody {

    @IsNotEmpty({
        message: "toast.error.enter-name"
    })
    firstName: string;
    lastName?: string;

    role: CourseStaffRole;

    @IsPhoneNumber("KZ", {
        message: "toast.error.enter-phone"
    })
    phone: string;
}