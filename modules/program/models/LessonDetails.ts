import Lesson from "./Lesson";
import Homework from "../../homework/models/Homework";

export default interface LessonDetails {
    lesson: Lesson;
    homework?: Homework;
}