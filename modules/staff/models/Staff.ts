export default class Staff {
    id: number;
    courseId: number;
    firstName: string;
    lastName?: string;
    phone: string;
    role: CourseStaffRole;

    static empty = (courseId: number): Staff => {
        return {
            id: -1,
            courseId: courseId,
            firstName: "",
            role: "ADMIN",
            phone: ""
        }
    }
}

export type CourseStaffRole = "OWNER" | "ADMIN" | "ASSISTANT" | "STUDENT";