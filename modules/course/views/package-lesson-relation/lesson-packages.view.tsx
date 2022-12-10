import Lesson from "../../../program/models/Lesson";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useCourseData } from "../../provider/course.provider";
import LessonPackageView from "./lesson-package.view";
import { useTranslation } from "react-i18next";

interface LessonPackagesViewProps {
    lesson: Lesson;
    onEditLesson: (value: Lesson) => void;
}

export default function LessonPackagesView(props: LessonPackagesViewProps) {
    const { lesson, onEditLesson } = props;
    const { t } = useTranslation();
    const { packages } = useCourseData();

    return (
        <VStack spacing={"0.25rem"} align={"stretch"}>
            <Text fontSize={"md"} fontWeight={"medium"}>
                {t("component.lesson-packages.title")}
            </Text>
            <Box>
                {packages.map(coursePackage => (
                    <LessonPackageView coursePackage={coursePackage} lesson={lesson} onEditLesson={onEditLesson}/>
                ))}
            </Box>
        </VStack>
    )
}