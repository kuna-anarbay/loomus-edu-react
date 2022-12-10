import NetworkService from "../../../../utils/data/network-service";
import LessonResource from "../../models/LessonResource";
import LessonResourceSignedUrl from "../../models/LessonResourceSignedUrl";

export default class LessonResourceApi {

    private service = new NetworkService();

    getDownloadLink = async (courseId: number, lessonId: number, resourceId: number) =>
        this.service.get<string>(`/v1/course/${courseId}/lesson/${lessonId}/resource/${resourceId}/download-url`);


    upload = async (courseId: number, lessonId: number, file: File, onUploadProgress: (progress: number) => void): Promise<LessonResource> => {
        return this.service.post<LessonResourceSignedUrl>(`/v1/course/${courseId}/lesson/${lessonId}/resource/upload-url`, null, {
            size: file.size,
            name: file.name,
            extension: file.name.split(".").pop()
        }).then((res) => {
            return this.service.upload(res.url, new Blob([file]), {
                headers: {
                    "Content-Type": file.type
                },
                onUploadProgress: progressEvent => {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    onUploadProgress(progress)
                }
            }).then(() => {
                return this.service.put(`/v1/course/${courseId}/lesson/${lessonId}/resource/${res.resource.id}/confirm`).then(() => {
                    return res.resource;
                });
            })
        })
    }

    deleteById = async (courseId: number, lessonId: number, resourceId: number) =>
        this.service.delete(`/v1/course/${courseId}/lesson/${lessonId}/resource/${resourceId}`);

}