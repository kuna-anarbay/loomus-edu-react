import { useCreateStaff, useEditStaff } from "../../hooks/staff.hooks";
import Staff, { CourseStaffRole } from "../../models/Staff";
import { useTranslation } from "react-i18next";
import CreateStaffBody from "../../data/staff/dto/CreateStaffBody";
import { Form, Input, Modal, Select } from "antd";
import { useAppData } from "../../../common/providers/app-data-provider";
import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { useValidation } from "react-class-validator";
import ButtonComponent from "../../../../components/button/button.component";
import { useCourseData } from "../../../course/provider/course.provider";
import NumberUtils from "../../../../utils/number-utils";

interface EditStaffPageProps {
    courseId: number;
    isOpen: boolean;
    onClose: () => void;
    staff?: Staff;
}

export default function EditStaffModal(props: EditStaffPageProps) {
    const { isOpen, onClose, courseId } = props;
    const staff = props.staff ?? Staff.empty(courseId);
    const { mutate: createStaff, isLoading: isCreating } = useCreateStaff(courseId);
    const { mutate: handleEditStaff, isLoading: isEditing } = useEditStaff(courseId, staff.id);
    const { t } = useTranslation();
    const { editStaff } = useCourseData();
    const [validate] = useValidation(CreateStaffBody);
    const { toastError } = useAppData();
    const [body, setBody] = useState<CreateStaffBody>({
        firstName: staff.firstName,
        lastName: staff.lastName,
        role: staff.role,
        phone: staff.phone
    })
    const isLoading = isCreating || isEditing;

    useEffect(() => {
        setBody({
            firstName: staff.firstName,
            lastName: staff.lastName,
            role: staff.role,
            phone: staff.phone
        })
    }, [staff.id]);

    const onSubmit = async () => {
        if (!(await validate(body))) return;
        if (staff.id === -1) {
            createStaff(body, {
                onSuccess: (res) => {
                    editStaff(res);
                    setBody({
                        firstName: "",
                        lastName: undefined,
                        role: "ADMIN",
                        phone: ""
                    })
                    onClose();
                },
                onError: error => {
                    toastError(error)
                }
            })
        } else {
            handleEditStaff(body, {
                onSuccess: () => {
                    editStaff({
                        ...staff,
                        ...body
                    });
                    onClose();
                },
                onError: error => {
                    toastError(error)
                }
            })
        }
    }

    return (
        <Modal
            visible={isOpen}
            onCancel={onClose}
            footer={null}
            title={t(staff.id === -1 ? "form.edit-staff.add" : "form.edit-staff.edit")}
        >
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <SimpleGrid spacing={{ base: "0rem", md: "0.75rem" }} columns={{ base: 1, md: 2 }}>
                    <Form.Item
                        label={t("form.edit-staff.first-name")}
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
                            placeholder={t("form.edit-staff.first-name")}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t("form.edit-staff.last-name")}
                    >
                        <Input
                            value={body.lastName ?? ""}
                            onChange={e => setBody({
                                ...body,
                                lastName: e.target.value
                            })}
                            placeholder={t("form.edit-staff.last-name")}
                        />
                    </Form.Item>
                </SimpleGrid>

                <Form.Item
                    label={t("form.edit-staff.phone-number")}
                    extra={t("form.edit-staff.phone-number-extra")}
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
                            phone: NumberUtils.digits(e.target.value)
                        })}
                        placeholder={t("form.edit-staff.phone-number")}
                    />
                </Form.Item>

                {staff.id === -1 && (
                    <Form.Item
                        label={t("form.edit-staff.role")}
                        required={true}
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Select
                            value={body.role}
                            onSelect={(value: CourseStaffRole) => setBody({
                                ...body,
                                role: value
                            })}
                        >
                            <Select.Option value={"ADMIN"}>
                                {t("enum.role.admin")}
                            </Select.Option>
                            <Select.Option value={"ASSISTANT"}>
                                {t("enum.role.assistant")}
                            </Select.Option>
                        </Select>
                    </Form.Item>
                )}

                <ButtonComponent
                    name={"press_btn_save_staff"}
                    isLoading={isLoading}
                    title={t("button.save")}
                    type={"submit"}
                    onClick={onSubmit}
                />
            </Form>
        </Modal>
    )

}