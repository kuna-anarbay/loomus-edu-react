import Homework from "../../models/Homework";
import { Box, HStack, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import EditHomeworkModal from "./edit-homework.modal";
import { useTranslation } from "react-i18next";
import React from "react";
import ButtonComponent from "../../../../components/button/button.component";
import HomeworkView from "./homework.view";
import { IoCreate } from "react-icons/io5";

interface LessonHomeworkViewProps {
    courseId: number;
    lessonId: number;
    homework?: Homework;
    onEditHomework: (homework: Homework) => void;
    onDeleteHomework: (homework: Homework) => void;
}

export default function LessonHomeworkView(props: LessonHomeworkViewProps) {
    const { courseId, lessonId, homework, onDeleteHomework, onEditHomework } = props;
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            p={{ base: "1rem", md: "1.75rem" }}
            bgColor={"background.base"}
            rounded={{ base: "0.75rem", md: "1rem" }}
        >
            {homework ? (
                <HomeworkView
                    homework={homework}
                    onEditHomework={onEditHomework}
                    onDeleteHomework={onDeleteHomework}
                />
            ) : (
                <VStack py={"1.5rem"} spacing={"1rem"}>
                    <VStack spacing={"0.25rem"}>
                        <Text fontSize={"1.375rem"} fontWeight={"semibold"}>
                            {t("component.homework.title")}
                        </Text>
                        <Text>
                            {t("component.homework.title")}
                        </Text>
                    </VStack>
                    <ButtonComponent
                        name={"press_btn_create_homework"}
                        title={t("button.create")}
                        onClick={onOpen}
                        icon={IoCreate}
                        blockText={true}
                        iconPosition={"right"}
                        size={"sm"}
                    />
                </VStack>
            )}

            <EditHomeworkModal
                courseId={courseId}
                lessonId={lessonId}
                isOpen={isOpen}
                onClose={onClose}
                onEditHomework={onEditHomework}
            />
        </Box>
    )
}