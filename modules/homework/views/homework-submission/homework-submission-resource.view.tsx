import { Box, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import getFilePath from "../../../../utils/file/get-file-path";
import getFileSize from "../../../../utils/get-file-size";
import React from "react";
import IconButtonComponent from "../../../../components/button/icon-button.component";
import { IoTrash } from "react-icons/io5";

interface HomeworkResourceViewProps {
    file: File;
    onFileRemove: (file: File) => void;
}

export default function HomeworkSubmissionResourceView(props: HomeworkResourceViewProps) {
    const { file, onFileRemove } = props;

    return (
        <Box>
            <HStack
                cursor={"pointer"}
                spacing={"0.5rem"}
                _hover={{
                    textColor: "brand.base"
                }}
            >
                <Image width={"1.6rem"} height={"2rem"} src={getFilePath(file.name)}/>
                <Box overflowX={"hidden"}>
                    <Text wordBreak={"break-word"} fontSize={"sm"} noOfLines={1}>
                        {file.name}
                    </Text>
                    <Text fontSize={"xs"} textColor={"label.secondary"}>
                        {getFileSize(file.size)}
                    </Text>
                </Box>
                <Spacer/>
                <IconButtonComponent
                    name={`press_btn_remove_homework_submission_resource`}
                    icon={IoTrash}
                    colorScheme={"danger"}
                    fontSize={"1rem"}
                    onClick={() => onFileRemove(file)}
                />
            </HStack>
        </Box>
    )
}