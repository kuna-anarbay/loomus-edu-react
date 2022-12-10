import React, { useEffect, useState } from "react";
import { Box, Spinner, StackDivider, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { useCourseData } from "../../../course/provider/course.provider";
import Route from "../../../../utils/routing/route";
import CourseDashboardLayout from "../../../common/views/layout/course-dashboard.layout";
import Course from "../../../course/models/Course";
import { useDeleteHomework, useFindHomework } from "../../hooks/homework-hooks";
import HomeworkResource from "../../models/HomeworkResource";
import { useAppData } from "../../../common/providers/app-data-provider";
import IconMenuComponent from "../../../../components/menu/icon-menu.component";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Homework from "../../models/Homework";
import { useRouter } from "next/router";
import EditHomeworkModal from "./edit-homework.modal";
import HomeworkResourcesView from "../homework-resources/homework-resources-view";
import StudentSubmissionsView from "../student-submission/student-submissions.view";

interface HomeworkPageProps {
    course: Course;
    lessonId: number;
}

export default function HomeworkPage(props: HomeworkPageProps) {
    const { course, lessonId } = props;
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isStaff, isStudent, isAdmin } = useCourseData();
    const { mutate: findHomework } = useFindHomework(course.id);
    const { toastError } = useAppData();
    const { push } = useRouter();
    const { mutate: deleteHomework, isLoading } = useDeleteHomework(course.id);
    const [resources, setResources] = useState<HomeworkResource[]>([]);
    const [homework, setHomework] = useState<Homework | undefined>(undefined);

    useEffect(() => {
        findHomework(lessonId, {
            onSuccess: res => setHomework(res)
        });
    }, []);

    return (
        <CourseDashboardLayout
            title={t("page.homework.title")}
            course={course}
            items={[
                {
                    value: course.name,
                    link: Route.courses.id(course.username)
                },
                {
                    value: t("page.lesson.title"),
                    link: Route.lessons.id(course.username, lessonId)
                }
            ]}
            backUrl={Route.lessons.id(course.username, lessonId)}
            isContainer={true}
            containerColor={"background.base"}
            buttons={isAdmin ? [
                <Box>
                    {isLoading ? <Spinner/> : (
                        <IconMenuComponent
                            icon={IoEllipsisHorizontal}
                            items={[
                                {
                                    name: "press_btn_edit_homework",
                                    logParams: {
                                        "lessonIdStr": `${lessonId}`
                                    },
                                    title: t("button.edit"),
                                    onClick: () => onOpen()
                                },
                                {
                                    name: "press_btn_delete_homework",
                                    logParams: {
                                        "lessonIdStr": `${lessonId}`
                                    },
                                    title: t("button.delete"),
                                    danger: true,
                                    textColor: "highlight.red.base",
                                    onClick: () => deleteHomework(lessonId, {
                                        onSuccess: () => {
                                            push(Route.lessons.id(course.username, lessonId))
                                        },
                                        onError: err => toastError(err)
                                    })
                                }
                            ]}
                        />
                    )}
                </Box>
            ] : []}
        >
            {isStaff && (
                <Tabs>
                    <Tabs.TabPane key={"general"} tab={t("tabs.homework.general")}>
                        <VStack align={"stretch"} spacing={"0.75rem"}>
                            {homework?.value && (
                                <Text fontSize={"md"}>
                                    {homework.value}
                                </Text>
                            )}

                            <HomeworkResourcesView
                                courseId={course.id}
                                homeworkId={lessonId}
                                resources={resources}
                                onResourcesChange={res => setResources(res)}
                            />
                        </VStack>
                    </Tabs.TabPane>

                    <Tabs.TabPane key={"submissions"} tab={t("tabs.homework.submissions")}>
                        {homework && (
                            <StudentSubmissionsView homework={homework}/>
                        )}
                    </Tabs.TabPane>
                </Tabs>
            )}

            {isStudent && (
                <VStack
                    spacing={"2rem"}
                    align={"stretch"}
                    divider={<StackDivider/>}
                >
                    {homework?.value && (
                        <Text>
                            {homework?.value}
                        </Text>
                    )}
                </VStack>
            )}

            {homework && (
                <EditHomeworkModal
                    courseId={homework.courseId}
                    lessonId={homework.id}
                    isOpen={isOpen}
                    homework={homework}
                    onClose={onClose}
                    onEditHomework={res => setHomework(res)}
                />
            )}
        </CourseDashboardLayout>
    )
}