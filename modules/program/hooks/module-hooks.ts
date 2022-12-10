import { useMutation } from "react-query";
import CreateModuleBody from "../data/module/dto/CreateModuleBody";
import ReorderModuleBody from "../data/module/dto/ReorderModuleBody";
import ModuleApi from "../data/module/module.api";

const moduleApi = new ModuleApi();


export const useFindModules = () => {
    return useMutation((courseId: number) => {
        return moduleApi.findAllByCourseId(courseId);
    })
}


export const useFindModule = (courseId: number) => {
    return useMutation((moduleId: number) => {
        return moduleApi.findByCourseIdAndId(courseId, moduleId);
    })
}


export const useCreateModule = (courseId: number) => {
    return useMutation((body: CreateModuleBody) => {
        return moduleApi.createByCourseId(courseId, body);
    })
}


export const useEditModule = (courseId: number, moduleId: number) => {
    return useMutation((body: CreateModuleBody) => {
        return moduleApi.editByCourseId(courseId, moduleId, body);
    })
}


export const useReorderModule = (courseId: number) => {
    return useMutation(({ moduleId, body }: { moduleId: number, body: ReorderModuleBody }) => {
        return moduleApi.reorderByCourseIdAndId(courseId, moduleId, body);
    })
}


export const useDeleteModule = (courseId: number) => {
    return useMutation((moduleId: number) => {
        return moduleApi.deleteByCourseIdAndId(courseId, moduleId);
    })
}