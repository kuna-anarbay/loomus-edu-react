import StaffApi from "../data/staff/staff.api";
import { useMutation } from "react-query";
import CreateStaffBody from "../data/staff/dto/CreateStaffBody";
import EditStaffBody from "../data/staff/dto/EditStaffBody";

const staffApi = new StaffApi();

export const useFindCourseStaffs = () => {
    return useMutation((courseId: number) => {
        return staffApi.findAllByCourseId(courseId);
    });
}

export const useFindCourseStaff = (courseId: number) => {
    return useMutation((staffId: number) => {
        return staffApi.findById(courseId, staffId);
    });
}


export const useCreateStaff = (courseId: number) => {
    return useMutation((body: CreateStaffBody) => {
        return staffApi.createStaff(courseId, body);
    });
}


export const useEditStaff = (courseId: number, staffId: number) => {
    return useMutation((body: EditStaffBody) => {
        return staffApi.editStaff(courseId, staffId, body);
    });
}


export const useDeleteStaff = (courseId: number) => {
    return useMutation((staffId: number) => {
        return staffApi.deleteStaff(courseId, staffId);
    });
}