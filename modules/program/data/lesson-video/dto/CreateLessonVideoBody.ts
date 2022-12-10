import { LessonVideoType } from "../../../models/LessonVideo";

export default class CreateLessonVideoBody {
    embedUrl: string;
    type: LessonVideoType;
}