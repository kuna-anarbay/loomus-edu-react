import { IsNotEmpty, IsOptional, IsPhoneNumber, Length } from "class-validator";

export class RegisterBody {

    @IsNotEmpty({
        message: "toast.error.enter-first-name"
    })
    firstName: string;

    @Length(1, 50)
    @IsOptional()
    lastName: string | undefined;

    @IsPhoneNumber("KZ", {
        message: "toast.error.enter-phone"
    })
    phone: string;

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