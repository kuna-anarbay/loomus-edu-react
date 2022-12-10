import { useTranslation } from "react-i18next";
import { AspectRatio, Box, Heading, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import AllLessonsView from "../../../program/views/lessons/all-lessons.view";
import React, { useState } from "react";
import CourseDashboardLayout from "../../../common/views/layout/course-dashboard.layout";
import { useUploadBanner } from "../../hooks/course.hooks";
import Compress from "browser-image-compression";
import { useAppData } from "../../../common/providers/app-data-provider";
import inputAccept from "../../../../utils/file/input-accept";
import UploadButtonComponent from "../../../../components/button/upload-button.component";
import imagePath from "../../../../utils/file/image-path";
import Course from "../../models/Course";
import { Tabs } from "antd";
import StaffsView from "../../../staff/views/staff/staffs.view";
import StudentsView from "../../../student/views/student/students.view";
import CoursePackagesView from "../course-package/course-packages.view";
import { useCourseData } from "../../provider/course.provider";
import EditCourseButton from "./edit-course.button";
import Route from "../../../../utils/routing/route";
import CourseSubscriptionView from "../course-subscription/course-subscription.view";

interface CourseHomePageProps {
    course: Course;
}

export default function CourseHomePage(props: CourseHomePageProps) {
    const { t } = useTranslation();
    const { toastError } = useAppData();
    const { isAdmin, subscription } = useCourseData();
    const [course, setCourse] = useState(props.course);
    const { mutate: uploadBanner, isLoading: isUploadingBanner } = useUploadBanner(course.id);
    const [isCompressingBanner, setIsCompressingBanner] = useState(false);
    const isLoadingBanner = isUploadingBanner || isCompressingBanner;

    const onFileSelect = async (file: File) => {
        if (!course) return;
        if (isUploadingBanner) return;
        const options = {
            maxSizeMB: 1,
            useWebWorker: true
        }
        setIsCompressingBanner(true);
        const blob = await Compress(file, options);
        setIsCompressingBanner(false);
        const imageFile = new File([blob], file.name, { type: file.type });
        const formData = new FormData();
        formData.set("file", imageFile);
        uploadBanner(formData, {
            onSuccess: (image) => {
                setCourse({
                    ...course,
                    banner: image
                })
            }, onError: error => toastError(error)
        });
    }

    return (
        <CourseDashboardLayout
            title={course?.name ?? ""}
            course={course}
            hideHeader={true}
            isContainer={true}
            bgColor={"background.highlight"}
            backUrl={Route.base()}
        >
            <VStack align={"stretch"} spacing={"1rem"} py={"1rem"}>
                <AspectRatio ratio={4}>
                    <Box position={"relative"}>
                        <Image
                            width={"100%"} height={"100%"}
                            objectFit={"cover"}
                            src={imagePath(course?.banner?.path)}
                            rounded={{ base: "0.75rem", md: "1rem" }}
                        />
                        {isAdmin && (
                            <Box position={"absolute"} top={"1rem"} right={"1rem"}>
                                <UploadButtonComponent
                                    size={"xs"}
                                    source={"COURSE_BANNER"}
                                    title={t("form.edit-course.upload-banner")}
                                    isLoading={isLoadingBanner}
                                    accept={inputAccept.avatar}
                                    onUpload={onFileSelect}
                                />
                            </Box>
                        )}
                    </Box>
                </AspectRatio>
                <VStack align={"stretch"}>
                    <HStack>
                        <Heading
                            fontSize={{ base: "1.75rem", md: "2.25rem" }}
                            lineHeight={{ base: "2.125rem", md: "2.625rem" }}
                            textColor={"label.base"}
                        >
                            {course?.name}
                        </Heading>
                        <Spacer/>
                        {isAdmin && (
                            <EditCourseButton
                                course={course}
                                onEditCourse={res => setCourse(res)}
                            />
                        )}
                    </HStack>
                    <Text fontSize={"md"}>
                        {course.description}
                    </Text>
                </VStack>


                {isAdmin ? (
                    <Tabs>
                        <Tabs.TabPane key={"lessons"} tab={t("tabs.course.lessons")}>
                            <AllLessonsView course={course}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={"students"} tab={t("tabs.course.students")}>
                            <StudentsView courseId={course.id}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={"packages"} tab={t("tabs.course.packages")}>
                            <CoursePackagesView courseId={course.id}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={"staffs"} tab={t("tabs.course.staffs")}>
                            <StaffsView courseId={course.id}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key={"subscription"} tab={t("tabs.course.subscription")}>
                            {subscription && <CourseSubscriptionView subscription={subscription}/>}
                        </Tabs.TabPane>
                    </Tabs>
                ) : (
                    <>
                        <AllLessonsView course={course}/>
                    </>
                )}
            </VStack>
        </CourseDashboardLayout>
    )
}