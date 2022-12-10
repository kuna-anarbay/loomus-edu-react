import { Box, HStack, Image, Spacer, Spinner, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { IoEllipsisHorizontal, IoTrash } from "react-icons/io5";
import getFilePath from "../../../../utils/file/get-file-path";
import getFileSize from "../../../../utils/get-file-size";
import { useDeleteResource, useGetResourceDownloadLink } from "../../hooks/lesson-resource.hooks";
import LessonResource from "../../models/LessonResource";
import IconMenuComponent from "../../../../components/menu/icon-menu.component";
import IconButtonComponent from "../../../../components/button/icon-button.component";
import { useCourseData } from "../../../course/provider/course.provider";
import { useRouter } from "next/router";

interface ResourceViewProps {
    source: "LESSON_RESOURCE" | "HOMEWORK_RESOURCE";
    resource: LessonResource;
    onResourceDelete?: (resource: LessonResource) => void;
    onResourceRemove?: (resource: LessonResource) => void;
}

export default function ResourceView(props: ResourceViewProps) {
    const { source, resource, onResourceDelete, onResourceRemove } = props;
    const { mutate, isLoading } = useDeleteResource(resource.courseId, resource.lessonId);
    const { t } = useTranslation();
    const { push } = useRouter();
    const {
        mutate: getDownloadLink,
        isLoading: isDownloading
    } = useGetResourceDownloadLink(resource.courseId, resource.lessonId);
    const { isAdmin } = useCourseData();

    const handleDeleteResource = () => {
        if (!onResourceDelete) return;
        mutate(resource.id, {
            onSuccess: () => {
                onResourceDelete(resource);
            }
        })
    }

    const download = () => {
        getDownloadLink(resource.id, {
            onSuccess: (res) => {
                // Create a link and set the URL using `createObjectURL`
                const link = document.createElement("a");
                link.style.display = "none";
                link.href = res;

                // It needs to be added to the DOM so it can be clicked
                document.body.appendChild(link);
                link.click();

                // To make this work on Firefox we need to wait
                // a little while before removing it.
                setTimeout(() => {
                    URL.revokeObjectURL(link.href);
                    link.parentNode?.removeChild(link);
                }, 0);
            }
        })
    }

    return (
        <HStack
            spacing={"0.5rem"}
        >
            <HStack
                onClick={() => download()}
                align={"center"}
                cursor={"pointer"}
                spacing={"0.5rem"}
                _hover={{
                    textColor: "brand.base"
                }}
            >
                <Image width={"2rem"} height={"2.5rem"} src={getFilePath(resource.path)}/>
                <Box overflowX={"hidden"}>
                    <Text wordBreak={"break-word"} fontSize={"sm"} noOfLines={1}>
                        {resource.name}
                    </Text>
                    <Text fontSize={"xs"} textColor={"label.secondary"}>
                        {getFileSize(resource.size)}
                    </Text>
                </Box>
            </HStack>
            <Spacer/>

            {isDownloading && (
                <Spinner size="sm"/>
            )}

            {onResourceDelete && isAdmin && (
                <Box>
                    {isLoading ? (
                        <Spinner size="sm"/>
                    ) : (
                        <IconMenuComponent
                            icon={IoEllipsisHorizontal}
                            items={[
                                {
                                    name: `press_btn_delete_${source.toLowerCase()}`,
                                    logParams: {
                                        "resourceIdStr": `${resource.id}`
                                    },
                                    title: t("button.delete"),
                                    danger: true,
                                    onClick: handleDeleteResource,
                                    textColor: "highlight.red.base"
                                }
                            ]}
                        />
                    )}
                </Box>
            )}

            {onResourceRemove && (
                <IconButtonComponent
                    name={`press_btn_remove_${source.toLowerCase()}`}
                    icon={IoTrash}
                    colorScheme={"danger"}
                    onClick={() => onResourceRemove(resource)}
                />
            )}

        </HStack>
    )
}