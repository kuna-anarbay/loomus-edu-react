export default class CoursePackage {
    id: number;
    courseId: number;
    name: string;
    lessonsCount: number;
    homeworkAvailable: boolean;

    static empty = (courseId: number): CoursePackage => {
        return {
            id: -1,
            courseId: courseId,
            name: "",
            lessonsCount: 0,
            homeworkAvailable: false
        }
    }
}