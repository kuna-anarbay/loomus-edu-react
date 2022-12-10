import { useTranslation } from "react-i18next";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Box, HStack, Spacer, useDisclosure } from "@chakra-ui/react";
import EditCourseModal from "./edit-course.modal";
import Course from "../../models/Course";
import IconMenuComponent from "../../../../components/menu/icon-menu.component";

interface EditCourseButtonProps {
    course: Course;
    onEditCourse: (value: Course) => void;
}

export default function EditCourseButton(props: EditCourseButtonProps) {
    const { course, onEditCourse } = props;
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <HStack>
                <Spacer/>
                <IconMenuComponent
                    icon={IoEllipsisHorizontal}
                    items={[
                        {
                            name: "press_btn_edit_course",
                            logParams: {
                                "courseIdStr": `${course.id}`
                            },
                            title: t("button.edit"),
                            onClick: () => onOpen()
                        }
                    ]}
                />
            </HStack>
            <EditCourseModal
                isOpen={isOpen}
                onClose={onClose}
                course={course}
                onEditCourse={onEditCourse}
            />
        </Box>
    )
}