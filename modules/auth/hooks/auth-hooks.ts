import { useMutation } from "react-query";
import { LocalStorageKey, useLocalStorage } from "../../common/hooks/use-local-storage";
import UserApi from "../../user/data/user-api";
import AuthApi from "../data/auth-api";
import LoginBody from "../data/dtos/LoginBody";
import { RegisterBody } from "../data/dtos/RegisterBody";
import RequestSmsCodeBody from "../data/dtos/RequestSmsCodeBody";
import TokenData from "../models/TokenData";
import ResetPasswordBody from "../data/dtos/ResetPasswordBody";

const authApi = new AuthApi();
const userApi = new UserApi();

export const useLogin = () => {
    const { set } = useLocalStorage();
    return useMutation((body: LoginBody) => {
        return authApi.login(body).then(async data => {
            set(LocalStorageKey.TOKEN_DATA, {
                refreshedAt: new Date().getTime() / 1000,
                value: data
            });

            return await userApi.findMyProfile();
        });
    });
}


export const useLogout = () => {
    const { set, get } = useLocalStorage();
    const tokenData = get<TokenData>(LocalStorageKey.TOKEN_DATA);
    return useMutation((_: null) => {
        return authApi.logout({ refreshToken: tokenData?.value.refreshToken ?? "" }).then(async () => {
            set(LocalStorageKey.TOKEN_DATA, null);
            return;
        }).catch(err => {
            set(LocalStorageKey.TOKEN_DATA, null);
            return err;
        })
    });
}


export const useRegister = () => {
    const { set } = useLocalStorage();
    return useMutation((body: RegisterBody) => {
        return authApi.register(body).then(async data => {
            set(LocalStorageKey.TOKEN_DATA, {
                refreshedAt: new Date().getTime() / 1000,
                value: data
            });

            return await userApi.findMyProfile();
        });
    });
}


export const useRequestSmsCode = () => {
    return useMutation((body: RequestSmsCodeBody) => {
        return authApi.requestSmsCode(body);
    });
}


export const useResetPassword = () => {
    const { set } = useLocalStorage();
    return useMutation((body: ResetPasswordBody) => {
        return authApi.resetPassword(body).then(async data => {
            set(LocalStorageKey.TOKEN_DATA, {
                refreshedAt: new Date().getTime() / 1000,
                value: data
            });

            return await userApi.findMyProfile();
        });
    });
}