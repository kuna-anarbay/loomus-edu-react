import { VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import HomeworkSubmissionResourceView from "./homework-submission-resource.view";
import UploadButtonComponent from "../../../../components/button/upload-button.component";
import inputAccept from "../../../../utils/file/input-accept";

interface HomeworkSubmissionResourcesViewProps {
    files: File[];
    onFilesChange: (resources: File[]) => void;
}

export default function HomeworkSubmissionResourcesView(props: HomeworkSubmissionResourcesViewProps) {
    const { onFilesChange, files } = props;
    const { t } = useTranslation();

    const handleRemoveFile = (file: File, index: number) => {
        const temp = [...files];
        temp.splice(index, 1);
        onFilesChange(temp);
    }

    return (
        <VStack align={"stretch"} spacing={"0.5rem"}>
            <UploadButtonComponent
                title={t("component.homework-submission-resources.attach")}
                source={"HOMEWORK_ATTACHMENT"}
                isLoading={false}
                size={"xs"}
                colorScheme={"gray"}
                accept={inputAccept.submissionResource}
                onUpload={file => onFilesChange([...files, file])}
            />
            {files.map((file, index) => (
                <HomeworkSubmissionResourceView
                    key={`file-${file.name}`}
                    file={file}
                    onFileRemove={() => handleRemoveFile(file, index)}/>
            ))}
        </VStack>
    )

}