import { Box, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import HomeworkResource from "../../models/HomeworkResource";
import { useState } from "react";
import { Progress, Upload } from "antd";
import { IoCloudUpload } from "react-icons/io5";
import { useCourseData } from "../../../course/provider/course.provider";
import { useUploadHomeworkResource } from "../../hooks/homework-resource-hooks";
import HomeworkResourceView from "./homework-resource-view";

interface HomeworkResourcesViewProps {
    courseId: number;
    homeworkId: number;
    resources: HomeworkResource[];
    onResourcesChange?: (resources: HomeworkResource[]) => void;
}

export default function HomeworkResourcesView(props: HomeworkResourcesViewProps) {
    const { homeworkId, onResourcesChange, resources, courseId } = props;
    const { mutate: createResource, isLoading: isUploading } = useUploadHomeworkResource(courseId, homeworkId,
        progress => setProgress(progress));
    const { t } = useTranslation();
    const { isAdmin } = useCourseData();
    const [progress, setProgress] = useState(0);

    const saveToServer = (file: File) => {
        if (!onResourcesChange) return;
        const formData = new FormData();
        formData.set("file", file);
        formData.set("name", file.name);
        createResource(file, {
            onSuccess: (res) => {
                const result = [...resources, res];
                onResourcesChange(result);
            }
        });
    }

    const handleDeleteResource = (resource: HomeworkResource) => {
        if (!onResourcesChange) return;
        onResourcesChange(resources.filter(i => i.id !== resource.id));
    }

    return (
        <VStack align={"stretch"} spacing={"0.5rem"}>
            <Text fontSize={"lg"} fontWeight={"semibold"}>
                {t("component.homework-resources.title")}
            </Text>
            {resources.map(resource => (
                <HomeworkResourceView
                    key={`resource-${resource.id}`} resource={resource}
                    onResourceDelete={onResourcesChange ? handleDeleteResource : undefined}/>
            ))}
            {onResourcesChange && isAdmin && (
                <VStack align={"stretch"}>
                    {isUploading && (
                        <Progress percent={progress}/>
                    )}
                    <Upload.Dragger
                        name={"file"}
                        fileList={[]}
                        beforeUpload={(e: any) => {
                            saveToServer(e)
                        }}
                        accept={"*"}
                    >
                        <VStack py={"1rem"} spacing={"1rem"}>
                            <Text fontSize={"1.75rem"}>
                                <IoCloudUpload/>
                            </Text>
                            <Box>
                                <Text fontSize={"md"}>
                                    {t("component.upload-box.title")}
                                </Text>
                            </Box>
                        </VStack>
                    </Upload.Dragger>
                </VStack>
            )}
        </VStack>
    )

}