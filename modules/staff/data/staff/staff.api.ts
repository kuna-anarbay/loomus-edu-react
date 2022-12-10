import NetworkService from "../../../../utils/data/network-service";
import Staff from "../../models/Staff";
import CreateStaffBody from "./dto/CreateStaffBody";
import EditStaffBody from "./dto/EditStaffBody";

export default class StaffApi {

    private service = new NetworkService();

    findAllByCourseId = (courseId: number) =>
        this.service.get<Staff[]>(`/v1/course/${courseId}/staff`);


    findById = (courseId: number, staffId: number) =>
        this.service.get<Staff>(`/v1/course/${courseId}/staff/${staffId}`);


    createStaff = (courseId: number, body: CreateStaffBody) =>
        this.service.post<Staff>(`/v1/course/${courseId}/staff`, body);


    editStaff = (courseId: number, staffId: number, body: EditStaffBody) =>
        this.service.put(`/v1/course/${courseId}/staff/${staffId}`, body);


    deleteStaff = (courseId: number, staffId: number) =>
        this.service.delete(`/v1/course/${courseId}/staff/${staffId}`);

}