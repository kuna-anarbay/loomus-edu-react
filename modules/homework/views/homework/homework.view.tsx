import Homework from "../../models/Homework";
import { Box, Divider, HStack, Image, Spacer, Spinner, Text, useDisclosure, VStack } from "@chakra-ui/react";
import EditHomeworkModal from "./edit-homework.modal";
import { IoChevronForward, IoEllipsisHorizontal } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import DateUtils from "../../../../utils/date-utils";
import { useCourseData } from "../../../course/provider/course.provider";
import LinkComponent from "../../../../components/utility/link.component";
import IconMenuComponent from "../../../../components/menu/icon-menu.component";
import Route from "../../../../utils/routing/route";
import { useAppData } from "../../../common/providers/app-data-provider";
import { useDeleteHomework } from "../../hooks/homework-hooks";
import ButtonComponent from "../../../../components/button/button.component";
import HomeworkResourcesView from "../homework-resources/homework-resources-view";
import HomeworkSubmissionView from "../homework-submission/homework-submission.view";
import StudentSubmissionResourcesView from "../student-submission/student-submission-resources-view";

interface HomeworkViewProps {
    homework: Homework;
    onEditHomework: (homework: Homework) => void;
    onDeleteHomework: (homework: Homework) => void;
}

export default function HomeworkView(props: HomeworkViewProps) {
    const { homework, onDeleteHomework, onEditHomework } = props;
    const { t } = useTranslation();
    const { toastError } = useAppData();
    const { isStudent, isStaff, isAdmin, course } = useCourseData();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        mutate: deleteHomework,
        isLoading
    } = useDeleteHomework(homework.courseId);
    const [resources, setResources] = useState(homework.resources);


    return (
        <Box>
            <VStack align={"stretch"} spacing={"0.75rem"}>
                <HStack>
                    <Image
                        src={"/program/homework.svg"}
                        h={"2.75rem"} w={"2.75rem"} rounded={"0.5rem"}
                    />
                    <Box>
                        <Text fontSize={"lg"} fontWeight={"semibold"}>
                            {t("component.homework.title")}
                        </Text>
                        {homework.deadlineAt && (
                            <Text fontSize={"sm"} textColor={"label.secondary"}>
                                {t("component.homework.deadline")}: {DateUtils.format(homework.deadlineAt, "DD.MM.YYYY, HH:mm")}
                            </Text>
                        )}
                    </Box>

                    <Spacer/>

                    {isStaff && (
                        <LinkComponent href={Route.lessons.homework(course?.username ?? "", homework.id)}>
                            <ButtonComponent
                                name={"press_btn_open_homework"}
                                title={t("button.view")}
                                icon={IoChevronForward}
                                size={"xs"}
                                iconPosition={"right"}
                                blockText={true}
                            />
                        </LinkComponent>
                    )}

                    {isAdmin && (
                        <Box>
                            {isLoading ? <Spinner/> : (
                                <IconMenuComponent
                                    icon={IoEllipsisHorizontal}
                                    items={[
                                        {
                                            name: "press_btn_edit_homework",
                                            logParams: {
                                                "lessonIdStr": `${homework.id}`
                                            },
                                            title: t("button.edit"),
                                            onClick: () => onOpen()
                                        },
                                        {
                                            name: "press_btn_delete_homework",
                                            logParams: {
                                                "lessonIdStr": `${homework.id}`
                                            },
                                            title: t("button.delete"),
                                            danger: true,
                                            textColor: "highlight.red.base",
                                            onClick: () => deleteHomework(homework.id, {
                                                onSuccess: () => {
                                                    onDeleteHomework(homework)
                                                },
                                                onError: err => toastError(err)
                                            })
                                        }
                                    ]}
                                />
                            )}
                        </Box>
                    )}

                </HStack>

                <Text>
                    {homework.value}
                </Text>

                {(resources.length > 0 || isStaff) && (
                    <HomeworkResourcesView
                        courseId={homework.courseId}
                        homeworkId={homework.id}
                        resources={resources}
                        onResourcesChange={res => setResources(res)}
                    />
                )}

                {!homework.submission && isStudent && (
                    <HomeworkSubmissionView
                        homework={homework}
                        onEditSubmission={res => onEditHomework({
                            ...homework,
                            submission: res
                        })}
                    />
                )}

                {isStudent && homework.submission && (
                    <Box>
                        <VStack borderWidth={"1px"} borderColor={"divider.secondary"}
                                align={"stretch"} spacing={"0.5rem"}
                                px={"1rem"} py={"0.75rem"} rounded={"0.75rem"}
                                bgColor={"background.base"}
                        >
                            <Box>
                                <Text fontSize={"lg"} fontWeight={"semibold"}>
                                    {t(`enum.homework-submission-status.${homework.submission.status.toLowerCase()}`)}
                                </Text>
                                <Text>
                                    {t("component.homework-submission.submitted-at")} {DateUtils.format(homework.submission.submittedAt, "DD.MM.YYYY, HH:mm")}
                                </Text>
                            </Box>

                            <Divider borderColor={"divider.base"}/>

                            <Text fontSize={"md"}>
                                {homework.submission.value}
                            </Text>
                            {homework.submission.resources.length > 0 && (
                                <StudentSubmissionResourcesView resources={homework.submission.resources}/>
                            )}

                            {homework.submission?.notes && (
                                <Divider borderColor={"divider.base"}/>
                            )}

                            {homework.submission?.notes && (
                                <VStack align={"stretch"} spacing={"0.125rem"}>
                                    <Text fontSize={"15px"}>
                                        {t("component.student-homework-submission.notes")}
                                    </Text>
                                    <Text>
                                        {homework.submission.notes}
                                    </Text>
                                </VStack>
                            )}
                        </VStack>
                    </Box>
                )}
            </VStack>

            <EditHomeworkModal
                courseId={homework.courseId}
                lessonId={homework.id}
                isOpen={isOpen}
                homework={homework}
                onClose={onClose}
                onEditHomework={onEditHomework}
            />
        </Box>
    )
}