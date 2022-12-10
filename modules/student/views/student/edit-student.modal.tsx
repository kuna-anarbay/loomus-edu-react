import { useCreateStudent, useEditStudent } from "../../hooks/student.hooks";
import Student from "../../models/Student";
import { useTranslation } from "react-i18next";
import { Checkbox, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useValidation } from "react-class-validator";
import { useAppData } from "../../../common/providers/app-data-provider";
import ButtonComponent from "../../../../components/button/button.component";
import { Box, HStack, SimpleGrid } from "@chakra-ui/react";
import CreateStudentBody from "../../data/student/dto/CreateStudentBody";
import NumberUtils from "../../../../utils/number-utils";
import { useCourseData } from "../../../course/provider/course.provider";

interface EditStudentModalProps {
    courseId: number;
    isOpen: boolean;
    onClose: () => void;
    student?: Student;
    onEditStudent: (student: Student) => void;
}

export default function EditStudentModal(props: EditStudentModalProps) {
    const { isOpen, onClose, onEditStudent, courseId } = props;
    const { toastError } = useAppData();
    const { packages } = useCourseData();
    const student = props.student ?? Student.empty(courseId);
    const { mutate: createStudent, isLoading: isCreating } = useCreateStudent(courseId);
    const { mutate: editStudent, isLoading: isEditing } = useEditStudent(courseId, student.id);
    const { t } = useTranslation();
    const [validate] = useValidation(CreateStudentBody);
    const [body, setBody] = useState<CreateStudentBody>({
        packageId: student.packageId,
        firstName: student.firstName,
        lastName: student.lastName,
        phone: student.id === -1 ? "+7" : `+${student.phone}`,
        isActive: student.isActive
    })
    const isLoading = isCreating || isEditing;

    useEffect(() => {
        setBody({
            packageId: student.packageId,
            firstName: student.firstName,
            lastName: student.lastName,
            phone: student.id === -1 ? "+7" : `+${student.phone}`,
            isActive: student.isActive
        });
    }, [student.id]);

    const onSubmit = async () => {
        if (!(await validate(body))) return;
        if (student.id === -1) {
            createStudent(body, {
                onSuccess: (res) => {
                    editStudent(res);
                    setBody({
                        packageId: -1,
                        firstName: "",
                        lastName: undefined,
                        phone: "+7",
                        isActive: true
                    })
                    onClose();
                },
                onError: error => {
                    toastError(error)
                }
            })
        } else {
            editStudent(body, {
                onSuccess: () => {
                    onEditStudent({
                        ...student,
                        ...body
                    });
                    onClose();
                }, onError: error => toastError(error)
            })
        }
    }

    return (
        <Box>
            <Modal
                visible={isOpen}
                onCancel={onClose}
                footer={null}
                width={"40rem"}
                title={t(student.id === -1 ? "form.edit-student.add" : "form.edit-student.edit")}
            >
                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <SimpleGrid spacing={{ base: "0rem", md: "0.75rem" }} columns={{ base: 1, md: 2 }}>
                        <Form.Item
                            label={t("form.edit-student.first-name")}
                            required={true}
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input
                                value={body.firstName}
                                onChange={e => setBody({
                                    ...body,
                                    firstName: e.target.value
                                })}
                                placeholder={t("form.edit-student.first-name")}
                            />
                        </Form.Item>

                        <Form.Item
                            label={t("form.edit-student.last-name")}
                        >
                            <Input
                                value={body.lastName ?? ""}
                                onChange={e => setBody({
                                    ...body,
                                    lastName: e.target.value
                                })}
                                placeholder={t("form.edit-student.last-name")}
                            />
                        </Form.Item>
                    </SimpleGrid>

                    {student.id === -1 && (
                        <Form.Item
                            label={t("form.edit-student.phone-number")}
                            extra={t("form.edit-student.phone-number-extra")}
                            required={true}
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Input
                                type={"tel"}
                                value={NumberUtils.maskedPhone(body.phone)}
                                onChange={e => setBody({
                                    ...body,
                                    phone: NumberUtils.digits(e.target.value, 11)
                                })}
                                placeholder={t("form.edit-student.phone-number")}
                            />
                        </Form.Item>
                    )}


                    <SimpleGrid spacing={{ base: "0rem", md: "0.75rem" }} columns={{ base: 1, md: 2 }}>
                        <Form.Item
                            label={t("form.edit-student.package")}
                            required={true}
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <Select
                                value={body.packageId}
                                onSelect={(value: number) => setBody({
                                    ...body,
                                    packageId: value
                                })}
                            >
                                {packages.map(coursePackage => (
                                    <Select.Option value={coursePackage.id}>
                                        {coursePackage.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Checkbox
                                checked={body.isActive}
                                onChange={e => setBody({
                                    ...body,
                                    isActive: e.target.checked
                                })}
                            >
                                {t("form.edit-student.is-active")}
                            </Checkbox>
                        </Form.Item>

                    </SimpleGrid>

                    <HStack>
                        <ButtonComponent
                            name={"press_btn_save_student"}
                            isLoading={isLoading}
                            title={t("button.save")}
                            type={"submit"}
                            onClick={onSubmit}
                        />
                    </HStack>
                </Form>
            </Modal>
        </Box>
    )

}