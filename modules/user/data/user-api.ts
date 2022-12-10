import NetworkService from "../../../utils/data/network-service";
import User from "../models/User";
import EditUserBody from "./dto/EditUserBody";

export default class UserApi {

    private service = new NetworkService();


    findMyProfile = () => this.service.get<User>("/v1/user/me");


    editProfile = (body: EditUserBody) => this.service.put("/v1/user", body);


    uploadAvatar = (body: FormData) => this.service.put<string>("/v1/user/avatar", body);


    deleteAvatar = () => this.service.delete("/v1/user/avatar");

}