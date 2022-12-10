const videoFileExtensions = [
    "mp4", // MP4, Apple
    "mov", // MOV, Apple
    "wmv", // WMV, Microsoft
    "flv", // FLV, Adobe
    "avi", // AVI, Microsoft
    "webm", // WebM, Google
    "mkv" // MKV, Matroska
];

const imageFileExtensions = [
    "jpeg",
    "jpg",
    "png",
    "gif"
];

export default function getFilePath(path: string): string | undefined {
    const component = path.split("?")[0];
    if (component.toLowerCase().endsWith("doc") || component.toLowerCase().endsWith("docx")) {
        return "/file-types/file-doc.svg";
    }
    if (component.toLowerCase().endsWith("pdf")) {
        return "/file-types/file-pdf.svg";
    }
    if (component.toLowerCase().endsWith("ppt") || component.toLowerCase().endsWith("pptx")) {
        return "/file-types/file-presentation.svg";
    }
    if (component.toLowerCase().endsWith("xls") || component.toLowerCase().endsWith("xlsx")) {
        return "/file-types/file-sheets.svg";
    }
    if (component.toLowerCase().endsWith("zip")) {
        return "/file-types/file-zip.svg";
    }
    const filenameComponents = component.toLowerCase().split(".")
    if (filenameComponents.length > 0 && imageFileExtensions.includes(filenameComponents[filenameComponents.length - 1])) {
        return "/file-types/file-image.svg";
    }
    if (component.toLowerCase().endsWith("webp")) {
        return "/file-types/file-image.svg";
    }

    if (filenameComponents.length > 0 && videoFileExtensions.includes(filenameComponents[filenameComponents.length - 1])) {
        return "/file-types/file-video.svg";
    }

    return "/file-types/file-unknown.svg";
}