import { IsNotEmpty, IsOptional, Length } from "class-validator";
import { Gender } from "../../../common/models/Gender";
import Language from "../../../common/models/Language";

export default class EditUserBody {

    @IsNotEmpty()
    @Length(2, 50)
    firstName: string;

    @Length(0, 50)
    @IsOptional()
    lastName: string;

    birthday?: number;

    gender?: Gender;

    language: Language;

}