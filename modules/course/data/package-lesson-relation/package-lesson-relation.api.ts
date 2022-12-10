import NetworkService from "../../../../utils/data/network-service";
import Lesson from "../../../program/models/Lesson";

export default class PackageLessonRelationApi {

    private service = new NetworkService();

    findPackageLessons = (courseId: number, packageId: number) =>
        this.service.get<Lesson[]>(`/v1/course/${courseId}/package/${packageId}/lesson`);


    createPackageCourseRelation = (courseId: number, packageId: number, lessonId: number) =>
        this.service.post(`/v1/course/${courseId}/package/${packageId}/lesson/${lessonId}`);


    deletePackageCourseRelation = (courseId: number, packageId: number, lessonId: number) =>
        this.service.delete(`/v1/course/${courseId}/package/${packageId}/lesson/${lessonId}`);

}