import { useMutation } from "react-query";
import EditUserBody from "../data/dto/EditUserBody";
import UserApi from "../data/user-api";

const userApi = new UserApi();

export const useGetMe = () => {
    return useMutation((userId: undefined) => userApi.findMyProfile());
}


export const useEditProfile = () => {
    return useMutation((body: EditUserBody) => {
        return userApi.editProfile(body);
    })
}


export const useUploadAvatar = () => {
    return useMutation((body: FormData) => {
        return userApi.uploadAvatar(body);
    })
}


export const useDeleteAvatar = () => {
    return useMutation((userId: undefined) => {
        return userApi.deleteAvatar();
    })
}
