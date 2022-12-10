import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CreateLessonBody from "../../data/lesson/dto/CreateLessonBody";
import Lesson, { LessonStatus } from "../../models/Lesson";
import { useCreateLesson, useEditLesson } from "../../hooks/lesson-hooks";
import { Form, Input, Modal, Select } from "antd";
import { useValidation } from "react-class-validator";
import ButtonComponent from "../../../../components/button/button.component";
import { useCourseData } from "../../../course/provider/course.provider";

interface EditLessonModalProps {
    moduleId: number;
    isOpen: boolean;
    onClose: () => void;
    onEditLesson: (lesson: Lesson) => void;
    lesson?: Lesson;
}

export default function EditLessonModal(props: EditLessonModalProps) {
    const { moduleId, onEditLesson, onClose, isOpen } = props;
    const { courseId, packages } = useCourseData();
    const lesson = props.lesson ?? Lesson.empty(courseId, moduleId);
    const { t } = useTranslation();
    const { mutate: editLesson, isLoading: isEditing } = useEditLesson(courseId, lesson.id);
    const { mutate: createLesson, isLoading: isCreating } = useCreateLesson(courseId);
    const isLoading = isCreating || isEditing;
    const [validate] = useValidation(CreateLessonBody);
    const [body, setBody] = useState<CreateLessonBody>({
        moduleId: moduleId,
        name: lesson.name,
        description: lesson.description,
        status: lesson.status,
        packageIds: lesson.packages.map(p => p.id)
    })

    const onSubmit = async () => {
        if (!(await validate(body))) return;
        if (lesson.id === -1) {
            createLesson(body, {
                onSuccess: (res) => {
                    onEditLesson(res);
                    setBody({
                        moduleId: moduleId,
                        name: "",
                        description: "",
                        status: "DRAFT",
                        packageIds: []
                    });
                    onClose();
                }
            })
        } else {
            editLesson(body, {
                onSuccess: () => {
                    onEditLesson({
                        ...lesson,
                        ...body
                    });
                    onClose();
                }
            })
        }
    }

    return (
        <Modal
            width={"50rem"}
            title={t(lesson.id === -1 ? "form.edit-lesson.add" : "form.edit-lesson.edit")}
            visible={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}

            >
                <Form.Item
                    label={t("form.edit-lesson.name")}
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
                        placeholder={t("form.edit-lesson.name")}
                    />
                </Form.Item>

                <Form.Item
                    label={t("form.edit-lesson.status")}
                    required={true}
                    rules={[{ required: true }]}
                >
                    <Select
                        value={body.status}
                        onSelect={(value: LessonStatus) => setBody({
                            ...body,
                            status: value
                        })}
                    >
                        <Select.Option value={"DRAFT"}>
                            {t("enum.lesson-status.draft")}
                        </Select.Option>
                        <Select.Option value={"VISIBLE"}>
                            {t("enum.lesson-status.visible")}
                        </Select.Option>
                        <Select.Option value={"ACTIVE"}>
                            {t("enum.lesson-status.active")}
                        </Select.Option>
                    </Select>
                </Form.Item>

                {lesson.id === -1 && (
                    <Form.Item
                        label={t("form.edit-lesson.packages")}
                        required={true}
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Select
                            mode={"tags"}
                            placeholder={t("form.edit-lesson.packages")}
                            value={body.packageIds}
                            onChange={(value: number[]) => setBody({
                                ...body,
                                packageIds: value
                            })}
                        >
                            {packages.map(coursePackage => (
                                <Select.Option value={coursePackage.id}>
                                    {coursePackage.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                <Form.Item
                    label={t("form.edit-lesson.description")}
                >
                    <Input.TextArea
                        rows={5}
                        onChange={(e) => setBody({
                            ...body,
                            description: e.target.value
                        })}
                        value={body.description}
                        placeholder={t("form.edit-lesson.description")}
                    />
                </Form.Item>

                <ButtonComponent
                    name={"press_btn_save_lesson"}
                    isLoading={isLoading}
                    title={t("button.save")}
                    type={"submit"}
                    onClick={onSubmit}
                />

            </Form>
        </Modal>
    )
}