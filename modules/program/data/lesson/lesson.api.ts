import NetworkService from "../../../../utils/data/network-service";
import Lesson from "../../models/Lesson";
import LessonDetails from "../../models/LessonDetails";
import CreateLessonBody from "./dto/CreateLessonBody";
import EditLessonBody from "./dto/EditLessonBody";
import ReorderLessonBody from "./dto/ReorderLessonBody";

export default class LessonApi {

    private service = new NetworkService();

    findByCourseIdAndId = (courseId: number, lessonId: number) =>
        this.service.get<LessonDetails>(`/v1/course/${courseId}/lesson/${lessonId}`);


    createByCourseId = (courseId: number, body: CreateLessonBody) =>
        this.service.post<Lesson>(`/v1/course/${courseId}/lesson`, body);


    editByCourseId = (courseId: number, lessonId: number, body: EditLessonBody) =>
        this.service.put(`/v1/course/${courseId}/lesson/${lessonId}`, body);


    reorderByCourseIdAndId = (courseId: number, lessonId: number, body: ReorderLessonBody) =>
        this.service.put(`/v1/course/${courseId}/lesson/${lessonId}/reorder`, body);


    deleteByCourseIdAndId = (courseId: number, lessonId: number) =>
        this.service.delete(`/v1/course/${courseId}/lesson/${lessonId}`);

}