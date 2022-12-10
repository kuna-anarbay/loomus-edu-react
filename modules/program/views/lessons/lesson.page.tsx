import { Box, Container, Heading, HStack, Spacer, Spinner, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoChevronBack, IoChevronForward, IoEllipsisHorizontal } from "react-icons/io5";
import { useDeleteLesson, useFindLesson } from "../../hooks/lesson-hooks";
import Lesson from "../../models/Lesson";
import LessonResource from "../../models/LessonResource";
import LessonResourcesView from "../lesson-resources/lesson-resources-view";
import { useCourseData } from "../../../course/provider/course.provider";
import IconMenuComponent from "../../../../components/menu/icon-menu.component";
import Route from "../../../../utils/routing/route";
import EditLessonModal from "./edit-lesson.modal";
import LessonVideoView from "../lesson-video/lesson-video-view";
import CourseDashboardLayout from "../../../common/views/layout/course-dashboard.layout";
import Course from "../../../course/models/Course";
import LessonPackagesView from "../../../course/views/package-lesson-relation/lesson-packages.view";
import LessonHomeworkView from "../../../homework/views/homework/lesson-homework.view";
import Homework from "../../../homework/models/Homework";
import LinkComponent from "../../../../components/utility/link.component";

interface LessonPageProps {
    course: Course;
    lessonId: number;
}

export default function LessonPage(props: LessonPageProps) {
    const { course, lessonId } = props;
    const { isAdmin, isStaff, nextLesson, prevLesson } = useCourseData();
    const { t } = useTranslation();
    const { mutate: getLesson, isLoading } = useFindLesson(course.id);
    const { push } = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { mutate: deleteLesson, isLoading: isDeleting } = useDeleteLesson(course.id);
    const [lesson, setLesson] = useState<Lesson | undefined>(undefined);
    const [homework, setHomework] = useState<Homework | undefined>(undefined);
    const [resources, setResources] = useState<LessonResource[]>([]);
    const next = nextLesson(lessonId);
    const prev = prevLesson(lessonId);

    useEffect(() => {
        setResources([]);
        setHomework(undefined);
        setLesson(undefined);
        handleGetLesson();
    }, [lessonId]);



    const handleGetLesson = () => {
        getLesson(lessonId, {
            onSuccess: (res) => {
                setLesson(res.lesson);
                setHomework(res.homework);
                setResources(res.lesson.resources);
            }
        })
    }

    const handleDeleteLesson = () => {
        deleteLesson(lessonId, {
            onSuccess: () => {
                push(Route.courses.id(course.username));
            }
        })
    }

    const buttons = () => {
        return (
            <HStack>

                {isAdmin && isDeleting && (
                    <Spinner size="sm"/>
                )}
                {isAdmin && !isDeleting && (
                    <IconMenuComponent
                        key={`lesson-delete-btn`}
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
            </HStack>
        )
    }

    return (
        <CourseDashboardLayout
            course={course}
            hideHeader={true}
            title={lesson?.name ?? ""}
            items={[
                {
                    value: course?.name ?? "",
                    link: Route.courses.id(course.username)
                }
            ]}
            backUrl={Route.courses.id(course.username)}
            isLoading={isLoading}
            bgColor={"background.highlight"}
            isContainer={false}
            px={"0rem"}
            py={"0rem"}
        >
            <Box>
                {lesson && (
                    <Box>

                        {(lesson.video || isStaff) && (
                            <Box
                                bgColor={"background.dark"} overflow={"hidden"}
                                h={{ md: "75vh" }} maxH={{ md: "75vh" }}
                            >
                                <LessonVideoView
                                    lesson={lesson}
                                    video={lesson.video}
                                    onSetVideo={res => setLesson({
                                        ...lesson,
                                        video: res
                                    })}
                                />
                            </Box>
                        )}

                        <Box bgColor={"background.highlight"}>
                            <Container
                                maxW={"1080px"}
                                pt={lesson.video ? "0rem" : "1rem"} px={"0rem"} pb={"4rem"}
                                bgColor={"background.highlight"}
                            >
                                <VStack
                                    align={"stretch"}
                                    spacing={{ base: "1.25rem", md: "2rem" }}
                                >
                                    <VStack spacing={{ base: "0.75rem", md: "1.25rem" }} align={"stretch"}
                                            p={{ base: "1rem", md: "1.75rem" }}
                                            bgColor={"background.base"}
                                            roundedTop={lesson.video ? "0rem" : { base: "0.75rem", md: "1rem" }}
                                            roundedBottom={{ base: "0.75rem", md: "1rem" }}
                                    >

                                        <HStack>
                                            <Box>
                                                <Heading fontSize={{ base: "1.5rem", md: "2rem" }}>
                                                    {lesson.name}
                                                </Heading>
                                                <HStack>
                                                    {isAdmin && (
                                                        <Box as={"span"} fontSize={"sm"} px={"6px"} py={"2px"}
                                                             rounded={"3px"} lineHeight={"120%"}
                                                             bgColor={Lesson.statusColor(lesson)}
                                                        >
                                                            {t(`enum.lesson-status.${lesson.status.toLowerCase()}`)}
                                                        </Box>
                                                    )}
                                                </HStack>
                                            </Box>
                                            <Spacer/>
                                            {buttons()}
                                        </HStack>

                                        {isAdmin && (
                                            <LessonPackagesView
                                                lesson={lesson}
                                                onEditLesson={res => setLesson(res)}
                                            />
                                        )}

                                        {lesson.description && (
                                            <VStack align={"stretch"}>
                                                <Text fontSize={"lg"} fontWeight={"semibold"}>
                                                    {t("page.lesson.description")}
                                                </Text>
                                                <Text>
                                                    {lesson.description}
                                                </Text>
                                            </VStack>
                                        )}
                                        {(isAdmin || resources.length > 0) && (
                                            <LessonResourcesView
                                                courseId={course.id}
                                                lessonId={lessonId}
                                                resources={resources}
                                                onResourcesChange={res => setResources(res)}
                                            />
                                        )}
                                    </VStack>


                                    {(isAdmin || homework) && (
                                        <LessonHomeworkView
                                            courseId={course.id}
                                            lessonId={lessonId}
                                            homework={homework}
                                            onEditHomework={res => setHomework(res)}
                                            onDeleteHomework={() => setHomework(undefined)}
                                        />
                                    )}

                                    <HStack>
                                        {prev && (
                                            <LinkComponent href={Route.lessons.id(course.username, prev.id)}>
                                                <HStack spacing={"0.25rem"}>
                                                    <Text>
                                                        <IoChevronBack/>
                                                    </Text>
                                                    <Text>
                                                        {prev.name}
                                                    </Text>
                                                </HStack>
                                            </LinkComponent>
                                        )}
                                        <Spacer/>
                                        {next && (
                                            <LinkComponent href={Route.lessons.id(course.username, next.id)}>
                                                <HStack spacing={"0.25rem"}>
                                                    <Text>
                                                        {next.name}
                                                    </Text>
                                                    <Text>
                                                        <IoChevronForward/>
                                                    </Text>
                                                </HStack>
                                            </LinkComponent>
                                        )}
                                    </HStack>

                                </VStack>
                            </Container>
                        </Box>
                    </Box>
                )}
            </Box>

            {lesson && (
                <EditLessonModal
                    lesson={lesson}
                    moduleId={lesson.moduleId}
                    isOpen={isOpen}
                    onClose={onClose}
                    onEditLesson={res => setLesson(res)}
                />
            )}

        </CourseDashboardLayout>
    )
}