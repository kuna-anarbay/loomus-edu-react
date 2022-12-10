import { Box, HStack, Spacer, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { IoEllipsisHorizontal, IoMenu } from "react-icons/io5";
import Lesson from "../../models/Lesson";
import { useCourseData } from "../../../course/provider/course.provider";
import LinkComponent from "../../../../components/utility/link.component";
import IconButtonComponent from "../../../../components/button/icon-button.component";
import Route from "../../../../utils/routing/route";
import React from "react";
import IconMenuComponent from "../../../../components/menu/icon-menu.component";
import { useDeleteLesson } from "../../hooks/lesson-hooks";
import EditLessonModal from "./edit-lesson.modal";

interface LessonViewProps {
    lesson: Lesson;
    provided: any;
    isReordering: boolean;
    onEditLesson: (lesson: Lesson) => void;
    onDeleteLesson: (lesson: Lesson) => void;
}

export default function LessonView(props: LessonViewProps) {
    const { provided, lesson, isReordering, onEditLesson, onDeleteLesson } = props;
    const { t } = useTranslation();
    const { isAdmin, isStudent, course, isStaff } = useCourseData();
    const { asPath } = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { mutate: deleteCurrentLesson, isLoading: isDeleting } = useDeleteLesson(lesson.courseId);
    const lessonId = parseInt(asPath.split("?")[0]?.split("/")[7]);

    const handleDeleteLesson = () => {
        deleteCurrentLesson(lesson.id, {
            onSuccess: () => {
                onDeleteLesson(lesson);
            }
        })
    }

    const isLessonAvailable = () => {
        if (isStaff) return true;
        return lesson.status === "ACTIVE";
    }

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
        >
            <HStack py={"0.75rem"} borderTopWidth={"1px"} borderColor={"divider.secondary"} px={"1rem"}
                    spacing={"0.75rem"}>
                <Box>
                    <LinkComponent
                        href={isLessonAvailable() ? Route.lessons.id(course?.username ?? "", lesson.id) : "#"}>
                        <Box
                            textColor={lessonId === lesson.id ? "brand.base" : "label.base"}
                            fontWeight={lessonId === lesson.id ? "medium" : "normal"}
                            _hover={{
                                textColor: "brand.base"
                            }}
                        >
                            <Text fontSize={"md"}>
                                <Box as={"span"}
                                     fontWeight={"medium"}>{t("component.lesson.index")} {lesson.index}.</Box> {lesson.name}
                            </Text>
                            <HStack>
                                {isAdmin && (
                                    <Box as={"span"} fontSize={"13px"} px={"6px"} py={"2px"}
                                         rounded={"3px"} lineHeight={"120%"}
                                         bgColor={Lesson.statusColor(lesson)}
                                    >
                                        {t(`enum.lesson-status.${lesson.status.toLowerCase()}`)}
                                    </Box>
                                )}
                            </HStack>
                        </Box>
                    </LinkComponent>
                </Box>
                <Spacer/>

                {isDeleting && (
                    <Spinner/>
                )}
                {!isReordering && !isDeleting && isAdmin && (
                    <IconMenuComponent
                        icon={IoEllipsisHorizontal}
                        items={[
                            {
                                name: "press_btn_edit_lesson",
                                logParams: {
                                    "lessonIdStr": `${lessonId}`
                                },
                                title: t("button.edit"),
                                onClick: () => onOpen()
                            },
                            {
                                name: "press_btn_delete_lesson",
                                logParams: {
                                    "lessonIdStr": `${lessonId}`
                                },
                                title: t("button.delete"),
                                danger: true,
                                textColor: "highlight.red.base",
                                onClick: handleDeleteLesson
                            }
                        ]}
                    />
                )}

                {isReordering && (
                    <div {...provided.dragHandleProps}>
                        <IconButtonComponent
                            name={"press_btn_reorder_lesson"}
                            icon={IoMenu}
                            logParams={{
                                "lessonIdStr": `${lessonId}`
                            }}
                        />
                    </div>
                )}
            </HStack>

            <EditLessonModal
                lesson={lesson}
                moduleId={lesson.moduleId}
                isOpen={isOpen}
                onClose={onClose}
                onEditLesson={onEditLesson}
            />
        </div>
    )

}