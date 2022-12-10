import Student from "../../models/Student";
import { useDeleteStudent } from "../../hooks/student.hooks";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { IoEllipsisHorizontal } from "react-icons/io5";
import EditStudentModal from "./edit-student.modal";
import { useAppData } from "../../../common/providers/app-data-provider";
import IconMenuComponent from "../../../../components/menu/icon-menu.component";

interface EditStudentButtonProps {
    student: Student;
    onEditStudent: (student: Student) => void;
    onDeleteStudent: (student: Student) => void;
}

export default function EditStudentButton(props: EditStudentButtonProps) {
    const { student, onDeleteStudent, onEditStudent } = props;
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { mutate: deleteStudent, isLoading } = useDeleteStudent(student.courseId);
    const { toastError } = useAppData();
    const { t } = useTranslation();

    return (
        <>
            {isLoading ? <Spinner/> : (
                <IconMenuComponent
                    icon={IoEllipsisHorizontal}
                    items={[
                        {
                            name: "press_btn_edit_student",
                            logParams: {
                                "studentIdStr": `${student.id}`
                            },
                            title: t("button.edit"),
                            onClick: () => onOpen()
                        },
                        {
                            name: "press_btn_delete_student",
                            logParams: {
                                "studentIdStr": `${student.id}`
                            },
                            title: t("button.delete"),
                            danger: true,
                            textColor: "highlight.red.base",
                            onClick: () => deleteStudent(student.id, {
                                onSuccess: () => {
                                    onDeleteStudent(student);
                                },
                                onError: error => toastError(error)
                            })
                        }
                    ]}
                />
            )}

            <EditStudentModal
                student={student}
                courseId={student.courseId}
                isOpen={isOpen}
                onClose={onClose}
                onEditStudent={onEditStudent}
            />
        </>
    )

}