import { IsPhoneNumber } from "class-validator";

export default class EditStaffBody {
    firstName: string;
    lastName?: string;

    @IsPhoneNumber("KZ", {
        message: "toast.error.enter-phone"
    })
    phone: string;
}