import NetworkService from "../../../../utils/data/network-service";
import LessonVideoSignedUrl from "../../models/LessonVideoSignedUrl";
import LessonVideo from "../../models/LessonVideo";
import * as tus from "tus-js-client";
import CreateLessonVideoBody from "./dto/CreateLessonVideoBody";

export default class LessonVideoApi {

    private service = new NetworkService();

    createByCourseId = (courseId: number, lessonId: number, body: CreateLessonVideoBody) =>
        this.service.post<LessonVideo>(`/v1/course/${courseId}/lesson/${lessonId}/video`, body);

    
    upload = async (courseId: number, lessonId: number, file: File, onUploadProgress: (progress: number) => void, onSuccess: (video: LessonVideo) => void) => {
        return this.service.post<LessonVideoSignedUrl>(`/v1/course/${courseId}/lesson/${lessonId}/video/upload-url`, null, {
            size: file.size,
            name: file.name,
            extension: file.name.split(".").pop()
        }).then((res) => {
            const uploader = new tus.Upload(file, {
                uploadUrl: res.url,
                endpoint: res.url,
                onError: (error) => {
                    throw error;
                },
                onProgress: (bytesUploaded, bytesTotal) => {
                    const progress = Math.round((bytesUploaded * 100) / bytesTotal);
                    onUploadProgress(Math.max(0, progress - 1));
                },
                onSuccess: () => {
                    return this.service.put(`/v1/course/${courseId}/lesson/${lessonId}/video/confirm`).then(() => {
                        onSuccess(res.video);
                    });
                },
            });

            uploader.findPreviousUploads().then(function (previousUploads) {
                // Found previous uploads so we select the first one.
                if (previousUploads.length) {
                    uploader.resumeFromPreviousUpload(previousUploads[0])
                }

                // Start the upload
                uploader.start()
            });
        })
    }

    deleteById = async (courseId: number, lessonId: number) =>
        this.service.delete(`/v1/course/${courseId}/lesson/${lessonId}/video`);

}