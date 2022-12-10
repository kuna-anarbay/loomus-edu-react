import { IsPhoneNumber } from "class-validator";

export default class RequestSmsCodeBody {

    @IsPhoneNumber("KZ")
    phone: string;

    purpose: "RESET_PASSWORD" | "SIGN_UP";
}