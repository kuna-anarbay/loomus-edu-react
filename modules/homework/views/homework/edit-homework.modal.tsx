import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCreateHomework } from "../../hooks/homework-hooks";
import Homework from "../../models/Homework";
import { DatePicker, Form, Input, Modal } from "antd";
import { useAppData } from "../../../common/providers/app-data-provider";
import ButtonComponent from "../../../../components/button/button.component";
import moment, { Moment } from "moment";

interface EditHomeworkModalProps {
    courseId: number;
    lessonId: number;
    isOpen: boolean;
    onClose: () => void;
    onEditHomework: (homework: Homework) => void;
    homework?: Homework;
}

export default function EditHomeworkModal(props: EditHomeworkModalProps) {
    const { courseId, lessonId, onEditHomework, isOpen, onClose } = props;
    const { toastError } = useAppData();
    const homework = props.homework ?? Homework.empty(courseId, lessonId);
    const { t } = useTranslation();
    const { mutate: createHomework, isLoading } = useCreateHomework(courseId, lessonId);
    const [deadlineAt, setDeadlineAt] = useState<Moment | null>(homework.deadlineAt ? moment(homework.deadlineAt * 1000) : null);
    const [text, setText] = useState(homework.value);

    const onSubmit = async () => {
        createHomework({
            value: text,
            deadlineAt: deadlineAt != null ? Math.floor(deadlineAt.toDate().getTime() / 1000) : undefined
        }, {
            onSuccess: (res) => {
                onEditHomework(res);
                onClose();
            },
            onError: err => toastError(err)
        })
    }

    return (
        <Modal
            title={t(props.homework ? "form.edit-homework.edit" : "form.edit-homework.add")}
            visible={isOpen}
            onCancel={onClose}
            footer={null}
            width={"50rem"}
        >
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >

                <Form.Item
                    label={t("form.edit-homework.value")}
                    required={true}
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <Input.TextArea
                        value={text}
                        rows={5}
                        onChange={e => setText(e.target.value)}
                        placeholder={t("form.edit-homework.value")}
                    />
                </Form.Item>

                <Form.Item label={t("form.edit-homework.deadline")}>
                    <DatePicker
                        allowClear={true}
                        placeholder={t("form.edit-homework.deadline")}
                        value={deadlineAt}
                        showTime={true}
                        showSecond={false}
                        onChange={date => {
                            setDeadlineAt(date);
                        }}
                    />
                </Form.Item>


                <ButtonComponent
                    name={"press_btn_save_homework"}
                    isLoading={isLoading}
                    title={t("button.save")}
                    type={"submit"}
                    onClick={onSubmit}
                />
            </Form>
        </Modal>
    )
}