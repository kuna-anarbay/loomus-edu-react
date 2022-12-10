import { Gender } from "../../common/models/Gender";
import Language from "../../common/models/Language";

export default interface User {
    id: number;
    phone: string;
    firstName: string;
    lastName?: string;
    birthday?: number;
    gender?: Gender;
    language: Language;
    avatarUrl?: string;
}

