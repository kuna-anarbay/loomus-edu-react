import { useEditCourse } from "../../hooks/course.hooks";
import React, { useState } from "react";
import Course from "../../models/Course";
import { useTranslation } from "react-i18next";
import CreateCourseBody from "../../data/course/dto/CreateCourseBody";
import { Form, Input, Modal } from "antd";
import { useAppData } from "../../../common/providers/app-data-provider";
import { useValidation } from "react-class-validator";
import ButtonComponent from "../../../../components/button/button.component";
import { Box, Text } from "@chakra-ui/react";
import EditCourseBody from "../../data/course/dto/EditCourseBody";

interface EditCoursePageProps {
    isOpen: boolean;
    onClose: () => void;
    course?: Course;
    onEditCourse: (value: Course) => void;
}

export default function EditCourseModal(props: EditCoursePageProps) {
    const { isOpen, onClose, onEditCourse } = props;
    const course = props.course ?? Course.empty();
    const { toastError } = useAppData();
    const { mutate: editCourse, isLoading } = useEditCourse(course.id);
    const { t } = useTranslation();
    const [validate] = useValidation(CreateCourseBody);
    const [body, setBody] = useState<EditCourseBody>({
        name: course.name,
        description: course.description
    });

    const onSubmit = async () => {
        if (!(await validate(body))) return;
        editCourse(body, {
            onSuccess: () => {
                onEditCourse({
                    ...course,
                    ...body
                });
                onClose();
            },
            onError: error => toastError(error)
        })
    }

    return (
        <Modal
            visible={isOpen}
            onCancel={onClose}
            footer={null}
            width={"40rem"}
            title={(
                <Box>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>
                        {t("form.edit-course.edit")}
                    </Text>
                </Box>
            )}
        >
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >

                <Form.Item
                    label={t("form.edit-course.name")}
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
                        placeholder={t("form.edit-course.name")}
                    />
                </Form.Item>


                <Form.Item label={t("form.edit-course.description")}>
                    <Input.TextArea
                        value={body.description}
                        onChange={e => setBody({
                            ...body,
                            description: e.target.value
                        })}
                        placeholder={t("form.edit-course.description")}
                    />
                </Form.Item>

                <ButtonComponent
                    name={"press_btn_save_course"}
                    isLoading={isLoading}
                    title={t("button.save")}
                    type={"submit"}
                    onClick={onSubmit}
                />
            </Form>
        </Modal>
    )

}