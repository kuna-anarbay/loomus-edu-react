import React from "react";
import { useTranslation } from "react-i18next";
import { Box, HStack, Spacer, StackDivider, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { IoAdd } from "react-icons/io5";
import ButtonComponent from "../../../../components/button/button.component";
import EditCoursePackageModal from "./edit-course-package.modal";
import EditCoursePackageButton from "./edit-course-package.button";
import { useCourseData } from "../../provider/course.provider";
import StringUtils from "../../../../utils/string-utils";

interface CoursePackagesViewProps {
    courseId: number;
}

export default function CoursePackagesView(props: CoursePackagesViewProps) {
    const { courseId } = props;
    const { t } = useTranslation();
    const { packages, editPackage, deletePackage } = useCourseData();
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Box>
            <VStack fontSize={"md"} align={"stretch"} spacing={"1rem"}>
                <HStack>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>
                        {t("component.packages.title")}
                    </Text>
                    <Spacer/>
                    <ButtonComponent
                        name={`press_btn_add_package`}
                        key={"add-staff-btn"}
                        icon={IoAdd}
                        size={"xs"}
                        title={t("button.add")}
                        colorScheme={"success"}
                        onClick={() => onOpen()}
                    />
                </HStack>

                <VStack
                    spacing={"0rem"} align={"stretch"}
                    divider={<StackDivider/>}
                    borderWidth={packages.length === 0 ? "0px" : "1px"}
                    borderColor={"divider.secondary"}
                    rounded={"0.5rem"}
                    bgColor={"background.base"}
                >
                    {packages.map(coursePackage => (
                        <HStack py={"0.5rem"} px={"1rem"}>
                            <Box>
                                <Text fontSize={"md"} fontWeight={"medium"}>
                                    {coursePackage.name}
                                </Text>
                                <Text fontSize={"sm"} textColor={"label.secondary"}>
                                    {coursePackage.lessonsCount} {t(StringUtils.lessonsCount(coursePackage.lessonsCount)).toLowerCase()} {coursePackage.homeworkAvailable && `• ${t("component.package.homework-available")}`}
                                </Text>
                            </Box>
                            <Spacer/>
                            <EditCoursePackageButton
                                coursePackage={coursePackage}
                                onEditPackage={editPackage}
                                onDeletePackage={deletePackage}
                            />
                        </HStack>
                    ))}
                </VStack>
            </VStack>


            <EditCoursePackageModal
                courseId={courseId}
                isOpen={isOpen}
                onClose={onClose}
                onEditPackage={editPackage}
            />

        </Box>
    )

}