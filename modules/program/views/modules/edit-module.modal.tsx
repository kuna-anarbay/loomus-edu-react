import { useState } from "react";
import { useTranslation } from "react-i18next";
import CreateModuleBody from "../../data/module/dto/CreateModuleBody";
import { useCreateModule, useEditModule } from "../../hooks/module-hooks";
import Module from "../../models/Module";
import { Form, Input, Modal } from "antd";
import { useValidation } from "react-class-validator";
import ButtonComponent from "../../../../components/button/button.component";
import { useCourseData } from "../../../course/provider/course.provider";

interface EditModuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEditModule: (module: Module) => void;
    module?: Module;
}

export default function EditModuleModal(props: EditModuleModalProps) {
    const { onEditModule, isOpen, onClose } = props;
    const { courseId } = useCourseData();
    const module = props.module ?? Module.empty(courseId);
    const { t } = useTranslation();
    const { mutate: editModule, isLoading: isEditing } = useEditModule(courseId, module.id);
    const { mutate: createModule, isLoading: isCreating } = useCreateModule(courseId);
    const isLoading = isCreating || isEditing;
    const [validate] = useValidation(CreateModuleBody);
    const [body, setBody] = useState<CreateModuleBody>({
        name: module.name
    })

    const onSubmit = async () => {
        if (!(await validate(body))) return;
        if (module.id === -1) {
            createModule(body, {
                onSuccess: (res) => {
                    onEditModule(res);
                    setBody({
                        name: ""
                    })
                    onClose();
                }
            })
        } else {
            editModule(body, {
                onSuccess: () => {
                    onEditModule({
                        ...module,
                        ...body
                    });
                    onClose();
                }
            })
        }
    }

    return (
        <Modal
            title={t(module.id === -1 ? "form.edit-module.add" : "form.edit-module.edit")}
            visible={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Form.Item
                    label={t("form.edit-module.name")}
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
                        placeholder={t("form.edit-module.name")}
                    />
                </Form.Item>

                <ButtonComponent
                    name={"press_btn_save_module"}
                    isLoading={isLoading}
                    title={t("button.save")}
                    type={"submit"}
                    onClick={onSubmit}
                />
            </Form>
        </Modal>
    )
}