import LessonResource from "./LessonResource";
import CoursePackage from "../../course/models/CoursePackage";
import LessonVideo from "./LessonVideo";
import withAlpha from "../../../utils/with-alpha";
import colors from "../../../config/theme/colors";

export default class Lesson {
    id: number;
    courseId: number;
    moduleId: number;
    index: number;
    name: string;
    description: string;
    status: LessonStatus;
    homeworkPassed: boolean;
    video?: LessonVideo;
    resources: LessonResource[];
    packages: CoursePackage[];

    static empty = (courseId: number, moduleId: number): Lesson => {
        return {
            id: -1,
            courseId: courseId,
            moduleId: moduleId,
            index: 1,
            name: "",
            description: "",
            status: "DRAFT",
            homeworkPassed: false,
            resources: [],
            packages: []
        }
    }

    static statusColor = (lesson: Lesson): string => {
        switch (lesson.status) {
            case "ACTIVE":
                return withAlpha(colors.highlight.green.base, 0.5);
            case "DRAFT":
                return withAlpha(colors.highlight.gray.base, 0.75)
            case "VISIBLE":
                return withAlpha(colors.highlight.orange.base, 0.5);
        }
    }
}

export type LessonStatus = "DRAFT" | "VISIBLE" | "ACTIVE";