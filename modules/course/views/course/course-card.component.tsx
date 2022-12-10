import { AspectRatio, Box, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import LinkComponent from "../../../../components/utility/link.component";
import { useTranslation } from "react-i18next";
import imagePath from "../../../../utils/file/image-path";
import MemberCourse from "../../models/MemberCourse";
import Route from "../../../../utils/routing/route";
import React from "react";
import { Progress } from "antd";
import colors from "../../../../config/theme/colors";

interface CourseCardComponentProps {
    course: MemberCourse;
}

export default function CourseCardComponent(props: CourseCardComponentProps) {
    const { course } = props;
    const { t } = useTranslation();

    const progress = () => {
        if (!course.progress) return 0;
        if (course.progress.total === 0) return 0;

        return course.progress.passed * 100 / course.progress.total;
    }

    const progressValue = () => {
        if (!course.progress) return 0;
        if (course.progress.total === 0) return 0;

        const result = course.progress.passed * 100 / course.progress.total;

        if (course.progress.passed * 100 % course.progress.total === 0) return result;

        return result.toFixed(1);
    }

    return (
        <LinkComponent href={Route.courses.id(course.course.username)}>
            <Box
                rounded={{ base: "0.75rem", md: "1rem" }}
                borderColor={"divider.secondary"}
                borderWidth={"1px"}
                shadow={"md"}
                overflow={"hidden"}
            >
                <AspectRatio ratio={4}>
                    <Image
                        objectFit={"cover"}
                        src={imagePath(course.course.banner?.path)}
                        borderWidth={"1px"}
                        borderColor={"divider.light"}
                    />
                </AspectRatio>
                <Box p={"1rem"}>
                    <VStack spacing={"0.25rem"} align={"stretch"}>
                        <VStack align={"stretch"} spacing={"0.25rem"}>
                            <Text fontSize={{ base: "md", md: "xl" }} fontWeight={"semibold"}>
                                {course.course.name}
                            </Text>
                            <Text fontSize={{ base: "xs", md: "sm" }} textColor={"label.secondary"}>
                                {t("component.course-card.from").toLowerCase()} {course.authorName}
                            </Text>
                        </VStack>

                        <Box>
                            <Progress strokeColor={colors.brand.base} percent={progress()} strokeWidth={4}
                                      showInfo={false}/>
                            <Text fontSize={{ base: "xs", md: "sm" }} textColor={"label.secondary"}>
                                {progressValue()}% {t("component.course-card.completed").toLowerCase()}
                            </Text>
                        </Box>

                    </VStack>
                </Box>
            </Box>
        </LinkComponent>
    );
}