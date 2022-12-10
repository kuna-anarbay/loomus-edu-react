import Lesson from "../../models/Lesson";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import StringUtils from "../../../../utils/string-utils";
import { useTranslation } from "react-i18next";

interface LessonItemViewProps {
    lesson: Lesson;
}

export default function LessonItemView(props: LessonItemViewProps) {
    const { lesson } = props;
    const { t } = useTranslation();

    return (
        <Box>
            <Text fontSize={"15px"}>
                {t("component.lesson.index")} {lesson.index}. {lesson.name}
            </Text>
            <Text fontSize={"xs"} textColor={"label.secondary"}>
                {lesson.resources.length} {t(StringUtils.resourcesCount(lesson.resources.length)).toLowerCase()}
            </Text>
        </Box>
    )
}