import { Box, HStack, Image, Text } from "@chakra-ui/react";
import getFilePath from "../../../../utils/file/get-file-path";
import getFileSize from "../../../../utils/get-file-size";
import React from "react";
import HomeworkSubmissionResource from "../../models/HomeworkSubmissionResource";
import { useGetHomeworkSubmissionDownloadLink } from "../../hooks/homework-submission-hooks";

interface StudentSubmissionResourceViewProps {
    resource: HomeworkSubmissionResource;
}

export default function StudentSubmissionResourceView(props: StudentSubmissionResourceViewProps) {
    const { resource } = props;
    const {
        mutate: getMyDownloadLink
    } = useGetHomeworkSubmissionDownloadLink(resource.courseId, resource.homeworkId);

    const download = () => {
        getMyDownloadLink(resource.id, {
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
        <Box>
            <HStack
                align={"course"}
                cursor={"pointer"}
                spacing={"0.5rem"}
                onClick={() => download()}
                _hover={{
                    textColor: "brand.base"
                }}
            >
                <Image width={"1.6rem"} height={"2rem"} src={getFilePath(resource.path)}/>
                <Box overflowX={"hidden"}>
                    <Text wordBreak={"break-word"} fontSize={"sm"} noOfLines={1}>
                        {resource.name}
                    </Text>
                    <Text fontSize={"xs"} textColor={"label.secondary"}>
                        {getFileSize(resource.size)}
                    </Text>
                </Box>
            </HStack>
        </Box>
    )
}