import React from "react";
import { useTranslation } from "react-i18next";
import { Box, HStack, Spacer, Text, useDisclosure, useMediaQuery, VStack } from "@chakra-ui/react";
import EditStaffButton from "./edit-staff.button";
import EditStaffModal from "./edit-staff.modal";
import ButtonComponent from "../../../../components/button/button.component";
import { IoAdd } from "react-icons/io5";
import { useCourseData } from "../../../course/provider/course.provider";
import Staff from "../../../staff/models/Staff";
import { Table } from "antd";
import StringUtils from "../../../../utils/string-utils";
import NumberUtils from "../../../../utils/number-utils";

interface StaffsViewProps {
    courseId: number;
}

export default function StaffsView(props: StaffsViewProps) {
    const { courseId } = props;
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { t } = useTranslation();
    const { staffs } = useCourseData();
    const [isMediumWidth] = useMediaQuery("(min-width: 768px)");

    return (
        <Box>
            <VStack fontSize={"md"} align={"stretch"} spacing={"1rem"}>
                <HStack>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>
                        {t("component.staffs.title")}
                    </Text>
                    <Spacer/>
                    <ButtonComponent
                        name={`press_btn_add_staff`}
                        key={"add-staff-btn"}
                        icon={IoAdd}
                        size={"xs"}
                        title={t("button.add")}
                        colorScheme={"success"}
                        onClick={() => onOpen()}
                    />
                </HStack>

                <Table
                    sticky={{
                        offsetHeader: 44
                    }}
                    scroll={{
                        x: 1000
                    }}
                    tableLayout={undefined}
                    bordered={true}
                    pagination={false}
                    dataSource={staffs}
                    columns={[
                        {
                            key: "fullName",
                            fixed: isMediumWidth ? "left" : undefined,
                            title: t("table.staffs.full-name"),
                            width: 250,
                            render: (staff: Staff) => (
                                <Text fontSize={"15px"} fontWeight={"medium"}>
                                    {StringUtils.fullName(staff)}
                                </Text>
                            )
                        },
                        {
                            key: "email",
                            title: t("table.staffs.phone-number"),
                            width: 200,
                            render: (staff: Staff) => NumberUtils.maskedPhone(staff.phone)
                        },
                        {
                            key: "role",
                            title: t("table.staffs.role"),
                            width: 150,
                            render: (staff: Staff) => t(`enum.role.${staff.role.toLowerCase()}`)
                        },
                        {
                            key: "action",
                            title: "",
                            fixed: isMediumWidth ? "right" : undefined,
                            width: 50,
                            render: (staff: Staff) => (
                                <>
                                    <EditStaffButton
                                        staff={staff}
                                    />
                                </>
                            )
                        }
                    ]}
                />
            </VStack>
            <EditStaffModal
                courseId={courseId}
                isOpen={isOpen}
                onClose={onClose}
            />
        </Box>
    )


}