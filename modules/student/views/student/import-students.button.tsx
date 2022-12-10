import { Box, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { IoCloudUpload, IoDocumentAttach } from "react-icons/io5";
import ButtonComponent from "../../../../components/button/button.component";
import { useTranslation } from "react-i18next";
import { Modal, Upload } from "antd";
import { useImportStudents } from "../../hooks/student.hooks";
import readXlsxFile from "read-excel-file"
import { useAppData } from "../../../common/providers/app-data-provider";
import CreateStudentBody from "../../data/student/dto/CreateStudentBody";
import Student from "../../models/Student";
import DefaultLoader from "../../../../components/loader/default-loader";
import NumberUtils from "../../../../utils/number-utils";
import { useCourseData } from "../../../course/provider/course.provider";

interface ImportStudentsButtonProps {
    courseId: number;
    onEditStudents: (value: Student[]) => void;
}

export default function ImportStudentsButton(props: ImportStudentsButtonProps) {
    const { courseId, onEditStudents } = props;
    const { toastError } = useAppData();
    const { packages } = useCourseData();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation();
    const { isLoading, mutate: importStudents } = useImportStudents(courseId);

    const saveToServer = (file: File) => {
        readXlsxFile(file).then(rows => {
            const body: CreateStudentBody[] = (rows ?? []).slice(1).map(row => {
                const packageId = packages.find(p => p.name.trim() === row[3].toString().trim())?.id;
                if (!packageId) throw new Error("Package not found");

                return {
                    firstName: row[0].toString().trim(),
                    lastName: row[1]?.toString().trim(),
                    phone: NumberUtils.phoneNumber(row[2].toString().trim()),
                    packageId: packageId,
                    isActive: true
                }
            });
            if (body.length === 0) return;
            importStudents(body, {
                onSuccess: res => {
                    onEditStudents(res);
                    onClose();
                },
                onError: error => toastError(error)
            });
        }).catch(error => {
            toastError(error);
        });
    }

    return (
        <Box>
            <ButtonComponent
                name={`press_btn_import_students`}
                icon={IoDocumentAttach}
                colorScheme={"success"}
                size={"xs"}
                title={t("button.import")}
                onClick={onOpen}
            />

            <Modal
                title={t("component.import-students.title")}
                visible={isOpen}
                onCancel={onClose}
                footer={null}
            >
                <Upload.Dragger
                    name={"file"}
                    fileList={[]}
                    beforeUpload={(e: any) => {
                        saveToServer(e)
                    }}
                >
                    {isLoading ? (
                        <DefaultLoader isLoading={true}/>
                    ) : (
                        <VStack py={"1rem"} spacing={"1rem"}>
                            <Text fontSize={"1.75rem"}>
                                <IoCloudUpload/>
                            </Text>
                            <Box>
                                <Text fontSize={"md"}>
                                    {t("component.upload-box.title")}
                                </Text>
                            </Box>
                        </VStack>
                    )}
                </Upload.Dragger>
            </Modal>
        </Box>
    )
}