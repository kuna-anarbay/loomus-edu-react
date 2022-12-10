import Staff from "../../models/Staff";
import { useDeleteStaff } from "../../hooks/staff.hooks";
import { Box, HStack, Spacer, Spinner, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { IoEllipsisHorizontal } from "react-icons/io5";
import EditStaffModal from "./edit-staff.modal";
import { useAppData } from "../../../common/providers/app-data-provider";
import IconMenuComponent, { IconMenuComponentItem } from "../../../../components/menu/icon-menu.component";
import { useCourseData } from "../../../course/provider/course.provider";

interface EditStaffButtonProps {
    staff: Staff;
}

export default function EditStaffButton(props: EditStaffButtonProps) {
    const { staff } = props;
    const { toastError } = useAppData();
    const { mutate: handleDeleteStaff, isLoading } = useDeleteStaff(staff.courseId);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { deleteStaff, isOwner } = useCourseData();
    const { t } = useTranslation();

    if (staff.role === "OWNER" && !isOwner) {
        return <></>
    }

    const items = (): IconMenuComponentItem[] => {
        return staff.role === "OWNER" ? [
            {
                name: "press_btn_edit_staff",
                logParams: {
                    "staffIdStr": `${staff.id}`
                },
                title: t("button.edit"),
                onClick: () => onOpen()
            }
        ] : [
            {
                name: "press_btn_edit_staff",
                logParams: {
                    "staffIdStr": `${staff.id}`
                },
                title: t("button.edit"),
                onClick: () => onOpen()
            },
            {
                name: "press_btn_delete_staff",
                logParams: {
                    "staffIdStr": `${staff.id}`
                },
                title: t("button.delete"),
                danger: true,
                textColor: "highlight.red.base",
                onClick: () => handleDeleteStaff(staff.id, {
                    onSuccess: () => {
                        deleteStaff(staff);
                    },
                    onError: error => toastError(error)
                })
            }
        ];
    }

    return (
        <Box>
            <HStack>
                <Spacer/>
                {isLoading ? <Spinner/> : (
                    <IconMenuComponent
                        icon={IoEllipsisHorizontal}
                        items={items()}
                    />
                )}
            </HStack>

            <EditStaffModal
                staff={staff}
                courseId={staff.courseId}
                isOpen={isOpen}
                onClose={onClose}
            />
        </Box>
    )

}