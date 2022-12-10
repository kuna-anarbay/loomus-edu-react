import { Box } from "@chakra-ui/react";
import { IoCloudUpload } from "react-icons/io5";
import ButtonComponent from "./button.component";

interface UploadButtonComponentProps {
    title: string;
    size?: "xs" | "sm" | "md" | "lg";
    source: "USER_AVATAR" | "CENTER_MEDIA" | "COURSE_BANNER" | "HOMEWORK" | "HOMEWORK_ATTACHMENT";
    colorScheme?: "brand" | "gray" | "success" | "danger" | "warning";
    isLoading: boolean;
    isDisabled?: boolean;
    accept: string;
    onUpload: (file: File) => void;
}

export default function UploadButtonComponent(props: UploadButtonComponentProps) {
    const { title, onUpload, isLoading, accept, source, size } = props;
    const isDisabled = props.isDisabled ?? false;
    const colorScheme = props.colorScheme ?? "brand";
    let inputRef: HTMLInputElement | null;

    const handleChange = (e: any) => {
        const [file] = e.target.files;
        if (file) {
            onUpload(file);
        }
    };

    return (
        <Box>
            <ButtonComponent
                name={`press_btn_upload_${source.toLowerCase()}`}
                title={title}
                icon={IoCloudUpload}
                blockText={true}
                isDisabled={isDisabled}
                variant={"outline"}
                size={size ?? "sm"}
                colorScheme={colorScheme}
                isLoading={isLoading}
                onClick={() => inputRef?.click()}
            />
            <input
                ref={refParam => inputRef = refParam}
                onChange={handleChange}
                multiple={false}
                accept={accept}
                type="file"
                hidden
            />
        </Box>
    )
}