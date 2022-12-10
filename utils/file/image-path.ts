import config from "../../config";

export default function imagePath(path?: string | null): string {
    if (path) {
        return config.mediaBaseUrl! + "/" + path;
    }

    return "/placeholders/placeholder.svg";
}