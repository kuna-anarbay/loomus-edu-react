import NetworkService from "../../../../utils/data/network-service";
import HomeworkResourceSignedUrl from "../../models/HomeworkResourceSignedUrl";
import HomeworkResource from "../../models/HomeworkResource";

export default class HomeworkResourceApi {

    private service = new NetworkService();

    getDownloadLink = async (courseId: number, homeworkId: number, resourceId: number) =>
        this.service.get<string>(`/v1/course/${courseId}/homework/${homeworkId}/resource/${resourceId}/download-url`);


    upload = async (courseId: number, homeworkId: number, file: File, onUploadProgress: (progress: number) => void): Promise<HomeworkResource> => {
        return this.service.post<HomeworkResourceSignedUrl>(`/v1/course/${courseId}/homework/${homeworkId}/resource/upload-url`, null, {
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
                return this.service.put(`/v1/course/${courseId}/homework/${homeworkId}/resource/${res.resource.id}/confirm`).then(() => {
                    return res.resource;
                });
            })
        })
    }


    deleteResource = (courseId: number, homeworkId: number, resourceId: number) =>
        this.service.delete(`/v1/course/${courseId}/homework/${homeworkId}/resource/${resourceId}`);

}