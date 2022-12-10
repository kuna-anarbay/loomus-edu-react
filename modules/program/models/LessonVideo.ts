export default class LessonVideo {
    courseId: number;
    lessonId: number;
    videoId: string;
    embedUrl: string;
    type: LessonVideoType;
    status: string;
}

export type LessonVideoType = "YOUTUBE" | "VIMEO" | "UPLOAD";