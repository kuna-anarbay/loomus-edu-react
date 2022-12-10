import NetworkService from "../../../../utils/data/network-service";
import Student from "../../models/Student";
import CreateStudentBody from "./dto/CreateStudentBody";
import EditStudentBody from "./dto/EditStudentBody";
import Paginate from "../../../../utils/data/Paginate";
import FindStudentsQuery from "./dto/FindStudentsQuery";
import UserSession from "../../../user/models/UserSession";
import Module from "../../../program/models/Module";

export default class StudentApi {

    private service = new NetworkService();

    findAllByCourseId = (courseId: number, query: FindStudentsQuery) =>
        this.service.get<Paginate<Student>>(`/v1/course/${courseId}/student`, query);


    findById = (courseId: number, studentId: number) =>
        this.service.get<Student>(`/v1/course/${courseId}/student/${studentId}`);


    findStudentSessions = (courseId: number, studentId: number) =>
        this.service.get<UserSession[]>(`/v1/course/${courseId}/student/${studentId}/session`);


    findStudentLessons = (courseId: number, studentId: number) =>
        this.service.get<Module[]>(`/v1/course/${courseId}/student/${studentId}/lesson`);


    createStudent = (courseId: number, body: CreateStudentBody) =>
        this.service.post<Student>(`/v1/course/${courseId}/student`, body);


    importStudents = (courseId: number, body: CreateStudentBody[]) =>
        this.service.post<Student[]>(`/v1/course/${courseId}/student/import`, body);


    editStudent = (courseId: number, studentId: number, body: EditStudentBody) =>
        this.service.put(`/v1/course/${courseId}/student/${studentId}`, body);


    deleteStudent = (courseId: number, studentId: number) =>
        this.service.delete(`/v1/course/${courseId}/student/${studentId}`);

}