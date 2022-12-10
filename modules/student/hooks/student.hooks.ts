import StudentApi from "../data/student/student.api";
import { useMutation } from "react-query";
import CreateStudentBody from "../data/student/dto/CreateStudentBody";
import EditStudentBody from "../data/student/dto/EditStudentBody";
import FindStudentsQuery from "../data/student/dto/FindStudentsQuery";

const studentApi = new StudentApi();

export const useFindCourseStudents = (courseId: number) => {
    return useMutation((query: FindStudentsQuery) => {
        return studentApi.findAllByCourseId(courseId, query);
    });
}


export const useFindCourseStudent = (courseId: number) => {
    return useMutation((studentId: number) => {
        return studentApi.findById(courseId, studentId);
    });
}


export const useFindStudentSessions = (courseId: number) => {
    return useMutation((studentId: number) => {
        return studentApi.findStudentSessions(courseId, studentId);
    });
}


export const useFindStudentLessons = (courseId: number) => {
    return useMutation((studentId: number) => {
        return studentApi.findStudentLessons(courseId, studentId);
    });
}


export const useCreateStudent = (courseId: number) => {
    return useMutation((body: CreateStudentBody) => {
        return studentApi.createStudent(courseId, body);
    });
}


export const useImportStudents = (courseId: number) => {
    return useMutation((body: CreateStudentBody[]) => {
        return studentApi.importStudents(courseId, body);
    });
}


export const useEditStudent = (courseId: number, studentId: number) => {
    return useMutation((body: EditStudentBody) => {
        return studentApi.editStudent(courseId, studentId, body);
    });
}


export const useDeleteStudent = (courseId: number) => {
    return useMutation((studentId: number) => {
        return studentApi.deleteStudent(courseId, studentId);
    });
}