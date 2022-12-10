import config from "../../config";

export default function avatarPath(path?: string | null): string {
    if (path) {
        return config.mediaBaseUrl! + "/" + path;
    }
    
    return "/placeholders/user-placeholder.svg";
}