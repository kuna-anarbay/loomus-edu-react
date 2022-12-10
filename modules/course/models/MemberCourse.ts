import Staff, { CourseStaffRole } from "../../staff/models/Staff";
import Student from "../../student/models/Student";
import Course from "./Course";

export default class MemberCourse {
    course: Course;
    authorName: string;
    progress?: {
        opened: number;
        passed: number;
        total: number;
    };
    role: CourseStaffRole;
    staff?: Staff;
    student?: Student;
    isExpired: boolean;
}