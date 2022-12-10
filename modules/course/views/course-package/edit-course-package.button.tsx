import { useTranslation } from "react-i18next";
import { useDeleteCoursePackage } from "../../hooks/course-package.hooks";
import CoursePackage from "../../models/CoursePackage";
import { Box, HStack, Spacer, Spinner, useDisclosure } from "@chakra-ui/react";
import { IoEllipsisHorizontal } from "react-icons/io5";
import EditCoursePackageModal from "./edit-course-package.modal";
import { useAppData } from "../../../common/providers/app-data-provider";
import IconMenuComponent from "../../../../components/menu/icon-menu.component";

interface EditCoursePackageButtonProps {
    coursePackage: CoursePackage;
    onEditPackage: (coursePackage: CoursePackage) => void;
    onDeletePackage: (coursePackage: CoursePackage) => void;
}

export default function EditCoursePackageButton(props: EditCoursePackageButtonProps) {
    const { coursePackage, onEditPackage, onDeletePackage } = props;
    const { mutate: deletePackage, isLoading } = useDeleteCoursePackage(coursePackage.courseId);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { t } = useTranslation();
    const { toastError } = useAppData();

    const onDelete = () => {
        deletePackage(coursePackage.id, {
            onSuccess: () => {
                onDeletePackage(coursePackage)
            },
            onError: error => {
                toastError(error)
            }
        })
    }

    return (
        <Box>
            <HStack>
                <Spacer/>
                {isLoading ? <Spinner/> : (
                    <IconMenuComponent
                        icon={IoEllipsisHorizontal}
                        items={[
                            {
                                name: "press_btn_edit_package",
                                logParams: {
                                    "packageIdStr": `${coursePackage.id}`
                                },
                                title: t("button.edit"),
                                onClick: () => onOpen()
                            },
                            {
                                name: "press_btn_delete_package",
                                logParams: {
                                    "packageIdStr": `${coursePackage.id}`
                                },
                                title: t("button.delete"),
                                danger: true,
                                textColor: "highlight.red.base",
                                onClick: () => onDelete()
                            }
                        ]}
                    />
                )}
            </HStack>
            <EditCoursePackageModal
                coursePackage={coursePackage}
                courseId={coursePackage.courseId}
                isOpen={isOpen}
                onClose={onClose}
                onEditPackage={onEditPackage}
            />
        </Box>
    )

}