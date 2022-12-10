import NetworkService from "../../../../utils/data/network-service";
import Homework from "../../models/Homework";
import CreateHomeworkBody from "./dto/CreateHomeworkBody";

export default class HomeworkApi {

    private service = new NetworkService();

    findByCourseIdAndLessonId = (courseId: number, lessonId: number) =>
        this.service.get<Homework>(`/v1/course/${courseId}/lesson/${lessonId}/homework`);


    createByCourseId = (courseId: number, lessonId: number, body: CreateHomeworkBody) =>
        this.service.post<Homework>(`/v1/course/${courseId}/lesson/${lessonId}/homework`, body);


    deleteByCourseIdAndId = (courseId: number, lessonId: number) =>
        this.service.delete(`/v1/course/${courseId}/lesson/${lessonId}/homework`);

}