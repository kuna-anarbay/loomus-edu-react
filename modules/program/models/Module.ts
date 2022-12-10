import Lesson from "./Lesson";

export default class Module {
    id: number;
    courseId: number;
    index: number;
    name: string;
    lessons: Lesson[];

    static empty = (courseId: number): Module => {
        return {
            id: -1,
            courseId: courseId,
            index: 1,
            name: "",
            lessons: []
        }
    }

    static copy = (module: Module, lessons: Lesson[]): Module => {
        return {
            ...module,
            lessons: lessons
        }
    }
}