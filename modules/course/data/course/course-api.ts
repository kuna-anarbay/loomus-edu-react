import Course from "../../models/Course";
import NetworkService from "../../../../utils/data/network-service";
import EditCourseBody from "./dto/EditCourseBody";
import CourseBanner from "../../models/CourseBanner";
import MemberCourse from "../../models/MemberCourse";
import CourseRole from "../../models/CourseRole";
import CourseSubscription from "../../models/CourseSubscription";

export default class CourseApi {

    private service = new NetworkService();

    findAllByCourseId = () =>
        this.service.get<MemberCourse[]>(`/v1/course`);


    findCourseSubscription = async (courseId: number) =>
        this.service.get<CourseSubscription>(`/v1/course/${courseId}/subscription`);


    findByUsername = async (username: string) =>
        this.service.get<Course>(`/v1/course/username/${username}`);


    findRoleById = async (courseId: number) =>
        this.service.get<CourseRole>(`/v1/course/${courseId}/role`);


    editCourse = async (courseId: number, body: EditCourseBody) =>
        this.service.put(`/v1/course/${courseId}`, body);


    uploadBanner = (courseId: number, body: FormData) =>
        this.service.put<CourseBanner>(`/v1/course/${courseId}/banner`, body);


}