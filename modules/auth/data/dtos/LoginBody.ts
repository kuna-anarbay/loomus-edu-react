import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export default class LoginBody {

    @IsPhoneNumber("KZ",{
        message: "toast.error.enter-phone"
    })
    phone: string;

    @IsNotEmpty({
        message: "toast.error.enter-code"
    })
    password: string;
    version: string;
    deviceType: string;
    os: string;
    platform: string;
}