import CourseBanner from "./CourseBanner";

export default class Course {
    id: number;
    username: string;
    name: string;
    description?: string;
    isActive: boolean;
    banner?: CourseBanner;

    static empty = (): Course => {
        return {
            id: -1,
            username: "",
            name: "",
            isActive: true
        }
    }
}