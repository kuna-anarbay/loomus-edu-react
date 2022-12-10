import axios, { AxiosError, AxiosRequestConfig } from "axios";
import config from "../../config";
import AuthResponse from "../../modules/auth/models/AuthResponse";
import TokenData from "../../modules/auth/models/TokenData";
import { LocalStorageKey } from "../../modules/common/hooks/use-local-storage";
import i18n from "i18next";
import DeviceUtils from "../device-utils";

export default class NetworkService {

    get = async <T>(url: string, params?: { [key: string]: any }, config?: AxiosRequestConfig): Promise<T> => {
        return this.request<T>({ method: "GET", url, params, ...config });
    }

    post = async <T>(url: string, data?: any, params?: { [key: string]: any }, config?: AxiosRequestConfig): Promise<T> => {
        return this.request<T>({ method: "POST", url, params, data, ...config });
    }

    put = async <T>(url: string, data?: any, params?: { [key: string]: any }, config?: AxiosRequestConfig): Promise<T> => {
        return this.request<T>({ method: "PUT", url, params, data, ...config });
    }

    delete = async <T>(url: string, params?: { [key: string]: any }, config?: AxiosRequestConfig): Promise<T> => {
        return this.request<T>({ method: "DELETE", url, params, ...config });
    }

    upload = async (url: string, body: any, config?: AxiosRequestConfig) => {
        return this.uploadClient().put(url, body, config);
    }

    private client = (() => {
        return axios.create({
            baseURL: config.baseUrl,
            headers: this.headers()
        });
    });


    private uploadClient = (() => {
        return axios.create();
    });

    private request = async <T>(options: AxiosRequestConfig) => {
        return this.getAccessToken().then(token => {
            if (config.nodeEnv === "development") {
                console.log(options);
            }
            return this.client().request<T>({
                ...options,
                headers: {
                    ...this.headers(token),
                    ...options.headers
                }
            });
        }).then(res => {
            return res.data
        }).catch(err => {
            const error = err as AxiosError;
            if (error.response?.status === 401 && typeof window !== "undefined") {
                window.localStorage.removeItem(LocalStorageKey.CURRENT_USER.toString());
                window.localStorage.removeItem(LocalStorageKey.TOKEN_DATA.toString());
            }
            const message = (error.response?.data as any)?.message
            const isMessageNull = !message || message.length === 0;
            switch (error.response?.status) {
                case 400:
                    return Promise.reject(`${isMessageNull ? "Неверные данные" : message}. Статус: 400`);
                case 401:
                    return Promise.reject(`${isMessageNull ? "Вы не авторизованы" : message}. Статус: 401`);
                case 403:
                    return Promise.reject(`${isMessageNull ? "У вас нет доступа к запрошенным данным" : message}. Статус: 403`);
                case 404:
                    return Promise.reject(`${isMessageNull ? "Запрошенные вами данные не найдены" : message}. Статус: 404`);
                case 500:
                    return Promise.reject(`${isMessageNull ? "Ошибка в сервере" : message}. Статус: 500`);
                default:
                    return Promise.reject(`${isMessageNull ? "Непредвиденная ошибка" : message}. Статус: ${error.response?.status ?? 500}`)
            }
        });
    }

    private headers = (accessToken?: string | null): { [key: string]: string } => {
        let headers: { [key: string]: string } = {
            "Content-Type": "application/json",
            "Accept-Language": i18n.language
        };

        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`
        }

        return headers;
    }

    private getAccessToken = async (): Promise<string | null> => {
        if (typeof window !== "undefined") {
            const item = window.localStorage.getItem(LocalStorageKey.TOKEN_DATA.toString());
            if (item) {
                const tokenData = JSON.parse(item) as TokenData;
                if (tokenData.refreshedAt + tokenData.value.expiresIn > new Date().getTime() / 1000) {
                    return tokenData.value.accessToken;
                }

                return await this.refreshToken(tokenData);
            }
        }

        return null;
    }

    refreshToken = async (tokenData: TokenData): Promise<string> => {
        const { data } = await this.client().post<AuthResponse>("/v1/auth/refresh-token", {
            version: config.version,
            deviceType: DeviceUtils.deviceName(),
            os: DeviceUtils.deviceVersion(),
            refreshToken: tokenData.value.refreshToken
        });
        const value: TokenData = {
            refreshedAt: new Date().getTime() / 1000,
            value: data
        }
        const newTokenData = JSON.stringify(value);
        window.localStorage.setItem(LocalStorageKey.TOKEN_DATA.toString(), newTokenData);

        return data.accessToken;
    }

}