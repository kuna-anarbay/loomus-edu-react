export default class Student {
    id: number;
    courseId: number;
    packageId: number;
    firstName: string;
    lastName?: string;
    phone: string;
    isActive: boolean;
    lastOpenedAt?: number;
    progress: {
        opened: number;
        passed: number;
        total: number;
    };

    static empty = (courseId: number): Student => {
        return {
            id: -1,
            courseId: courseId,
            packageId: -1,
            firstName: "",
            lastName: undefined,
            phone: "",
            isActive: true,
            progress: {
                opened: 0,
                passed: 0,
                total: 0
            }
        }
    }
}