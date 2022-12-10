import NetworkService from "../../../../utils/data/network-service";
import Module from "../../models/Module";
import CreateModuleBody from "./dto/CreateModuleBody";
import ReorderModuleBody from "./dto/ReorderModuleBody";

export default class ModuleApi {

    private service = new NetworkService();

    findAllByCourseId = (courseId: number) =>
        this.service.get<Module[]>(`/v1/course/${courseId}/module`)


    findByCourseIdAndId = (courseId: number, moduleId: number) =>
        this.service.get<Module>(`/v1/course/${courseId}/module/${moduleId}`);


    createByCourseId = (courseId: number, body: CreateModuleBody) =>
        this.service.post<Module>(`/v1/course/${courseId}/module`, body);


    editByCourseId = (courseId: number, moduleId: number, body: CreateModuleBody) =>
        this.service.put(`/v1/course/${courseId}/module/${moduleId}`, body);


    reorderByCourseIdAndId = (courseId: number, moduleId: number, body: ReorderModuleBody) =>
        this.service.put(`/v1/course/${courseId}/module/${moduleId}/reorder`, body);


    deleteByCourseIdAndId = (courseId: number, moduleId: number) =>
        this.service.delete(`/v1/course/${courseId}/module/${moduleId}`);

}