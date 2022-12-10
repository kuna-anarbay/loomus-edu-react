import NetworkService from "../../../../utils/data/network-service";
import CoursePackage from "../../models/CoursePackage";
import CreateCoursePackageBody from "./dto/CreateCoursePackageBody";
import EditCoursePackageBody from "./dto/EditCoursePackageBody";

export default class CoursePackageApi {

    private service = new NetworkService();

    findCoursePackages = (courseId: number) =>
        this.service.get<CoursePackage[]>(`/v1/course/${courseId}/package`);


    createCoursePackage = (courseId: number, body: CreateCoursePackageBody) =>
        this.service.post<CoursePackage>(`/v1/course/${courseId}/package`, body);


    editCoursePackage = (courseId: number, packageId: number, body: EditCoursePackageBody) =>
        this.service.put(`/v1/course/${courseId}/package/${packageId}`, body);


    deleteCoursePackage = (courseId: number, packageId: number) =>
        this.service.delete(`/v1/course/${courseId}/package/${packageId}`);

}