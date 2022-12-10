import { IsNotEmpty, IsPhoneNumber, Length } from "class-validator";

export default class ResetPasswordBody {

    @IsPhoneNumber("KZ", {
        message: "toast.error.enter-phone"
    })
    phone: string;

    @IsNotEmpty({
        message: "toast.error.enter-code"
    })
    password: string;

    @IsNotEmpty({
        message: "toast.error.enter-code"
    })
    @Length(6, 6, {
        message: "toast.error.enter-code"
    })
    code: string;

    version: string;
    deviceType: string;
    os: string;
    platform: string;
}