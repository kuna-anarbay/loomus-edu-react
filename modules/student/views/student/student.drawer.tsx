import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import StringUtils from "../../../../utils/string-utils";
import Student from "../../models/Student";
import { Box, HStack, Spacer, StackDivider, Text, VStack } from "@chakra-ui/react";
import DrawerComponent from "../../../../components/drawer/drawer.component";
import { useAppData } from "../../../common/providers/app-data-provider";
import { useFindCourseStudent, useFindStudentLessons, useFindStudentSessions } from "../../hooks/student.hooks";
import DateUtils from "../../../../utils/date-utils";
import NumberUtils from "../../../../utils/number-utils";
import { Tabs } from "antd";
import ModuleItemsView from "../../../program/views/modules/module-items.view";

interface StudentDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student;
    onEditStudent: (res: Student) => void;
}

export default function StudentDrawer(props: StudentDrawerProps) {
    const { isOpen, student, onClose, onEditStudent } = props;
    const { t } = useTranslation();
    const { toastError } = useAppData();
    const { mutate: findStudentSessions, data: sessions } = useFindStudentSessions(student.courseId);
    const { mutate: findStudentLessons, data: modules } = useFindStudentLessons(student.courseId);
    const { mutate: findStudent, isIdle, isLoading } = useFindCourseStudent(student.courseId);

    useEffect(() => {
        if (isIdle && isOpen) {
            findStudent(student.id, {
                onSuccess: res => onEditStudent(res),
                onError: err => toastError(err)
            })
            findStudentSessions(student.id);
            findStudentLessons(student.id);
        }
    }, [isOpen]);

    return (
        <DrawerComponent
            isOpen={isOpen}
            onClose={onClose}
            isLoading={isLoading}
            header={(
                <Text fontSize={"1.25rem"} fontWeight={"semibold"}>
                    {StringUtils.fullName(student)}
                </Text>
            )}
            size={"35rem"}
        >
            <VStack align={"stretch"} spacing={"1rem"}>
                <Box>
                    <Text fontSize={"md"} fontWeight={"medium"}>
                        {StringUtils.fullName(student)}
                    </Text>
                    <Text fontSize={"xs"} textColor={"label.secondary"}>
                        {NumberUtils.maskedPhone(student.phone)} • {student.phone}
                    </Text>
                </Box>

                <Tabs>
                    <Tabs.TabPane key={"general"} tab={t("tabs.student.lessons")}>
                        <ModuleItemsView modules={modules ?? []}/>
                    </Tabs.TabPane>

                    <Tabs.TabPane key={"access"} tab={t("tabs.student.sessions")}>
                        <VStack
                            spacing={"0rem"} align={"stretch"}
                            divider={<StackDivider/>}
                            borderWidth={"1px"}
                            borderColor={"divider.secondary"}
                            rounded={"0.5rem"}
                            bgColor={"background.base"}
                        >
                            {(sessions ?? []).map(session => (
                                <VStack align={"stretch"} py={"0.5rem"} px={"1rem"} spacing={"0.25rem"}>
                                    <HStack>
                                        <Text fontSize={"md"} fontWeight={"medium"}>
                                            {t(`enum.session-source.${session.platform.toLowerCase()}`)}
                                        </Text>
                                        <Spacer/>
                                        <Text fontSize={"sm"} textColor={"label.secondary"}>
                                            {DateUtils.format(session.lastActiveAt, "DD.MM.YYYY, HH:mm")}
                                        </Text>
                                    </HStack>
                                    <Text fontSize={"sm"}>
                                        {session.deviceType}, {session.os}
                                    </Text>
                                    <Text fontSize={"sm"} textColor={"label.secondary"}>
                                        IP: {session.ipAddress}
                                    </Text>
                                </VStack>
                            ))}
                        </VStack>
                    </Tabs.TabPane>
                </Tabs>
            </VStack>
        </DrawerComponent>
    )
}