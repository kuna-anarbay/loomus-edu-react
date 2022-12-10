import { useTranslation } from "react-i18next";
import { Checkbox, Form, Input, Modal } from "antd";
import { HStack, VStack } from "@chakra-ui/react";
import { useAppData } from "../../../common/providers/app-data-provider";
import React, { useState } from "react";
import ButtonComponent from "../../../../components/button/button.component";
import { useValidation } from "react-class-validator";
import { useCreateCoursePackage, useEditCoursePackage } from "../../hooks/course-package.hooks";
import CoursePackage from "../../models/CoursePackage";
import CreateCoursePackageBody from "../../data/course-package/dto/CreateCoursePackageBody";

interface EditCenterPackageModalProps {
    courseId: number;
    isOpen: boolean;
    onClose: () => void;
    coursePackage?: CoursePackage;
    onEditPackage: (coursePackage: CoursePackage) => void;
}

export default function EditCoursePackageModal(props: EditCenterPackageModalProps) {
    const { courseId, onEditPackage, isOpen, onClose } = props;
    const coursePackage = props.coursePackage ?? CoursePackage.empty(courseId)
    const { mutate: createPackage, isLoading: isCreating } = useCreateCoursePackage(courseId);
    const { mutate: editPackage, isLoading: isEditing } = useEditCoursePackage(courseId, coursePackage.id);
    const { t } = useTranslation();
    const [validate] = useValidation(CreateCoursePackageBody);
    const { toastError, } = useAppData();
    const [body, setBody] = useState<CreateCoursePackageBody>({
        name: coursePackage.name,
        homeworkAvailable: coursePackage.homeworkAvailable
    });
    const isLoading = isCreating || isEditing;

    const onSubmit = async () => {
        if (!(await validate(body))) return;
        if (coursePackage.id === -1) {
            createPackage(body, {
                onSuccess: (res) => {
                    setBody({
                        name: "",
                        homeworkAvailable: false
                    });
                    onEditPackage(res);
                    onClose();
                },
                onError: error => {
                    toastError(error)
                }
            })
        } else if (coursePackage) {
            editPackage(body, {
                onSuccess: () => {
                    onEditPackage({
                        ...coursePackage,
                        ...body,
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
            title={t(coursePackage.id === -1 ? "form.edit-package.add" : "form.edit-package.edit")}
        >
            <VStack align={"stretch"} spacing={"1.5rem"}>
                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}

                >
                    <Form.Item
                        label={t("form.edit-package.name")}
                        required={true}
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Input
                            value={body.name}
                            onChange={e => setBody({
                                ...body,
                                name: e.target.value
                            })}
                            placeholder={t("form.edit-package.name")}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Checkbox
                            checked={body.homeworkAvailable}
                            onChange={e => setBody({
                                ...body,
                                homeworkAvailable: e.target.checked
                            })}
                        >
                            {t("form.edit-package.homework-available")}
                        </Checkbox>
                    </Form.Item>

                    <HStack>
                        <ButtonComponent
                            name={"press_btn_save_package"}
                            isLoading={isLoading}
                            title={t("button.save")}
                            type={"submit"}
                            onClick={onSubmit}
                        />
                    </HStack>
                </Form>
            </VStack>
        </Modal>
    )

}