import AuthResponse from "../models/AuthResponse";
import NetworkService from "../../../utils/data/network-service";
import LoginBody from "./dtos/LoginBody";
import LogoutBody from "./dtos/LogoutBody";
import { RegisterBody } from "./dtos/RegisterBody";
import RequestSmsCodeBody from "./dtos/RequestSmsCodeBody";
import ResetPasswordBody from "./dtos/ResetPasswordBody";

export default class AuthApi {

    private service = new NetworkService();

    login = async (body: LoginBody) => this.service.post<AuthResponse>("/v1/auth/sign-in", body);


    logout = async (body: LogoutBody) => this.service.post("/v1/auth/sign-out", body);


    register = async (body: RegisterBody) => this.service.post<AuthResponse>("/v1/auth/sign-up", body);


    requestSmsCode = async (body: RequestSmsCodeBody) => this.service.post("/v1/auth/verification-code", body);


    resetPassword = async (body: ResetPasswordBody) => this.service.post<AuthResponse>("/v1/auth/reset-password", body);


}