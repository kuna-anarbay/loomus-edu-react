import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Box, Text, useMediaQuery, VStack } from "@chakra-ui/react";
import { Form, Input } from "antd";
import { useAppData } from "../../../common/providers/app-data-provider";
import { useSubmitHomework } from "../../hooks/homework-submission-hooks";
import ButtonComponent from "../../../../components/button/button.component";
import HomeworkSubmissionResourcesView from "./homework-submission-resources-view";
import { useUploadHomeworkSubmissionResource } from "../../hooks/homework-submission-resource-hooks";
import Homework from "../../models/Homework";
import HomeworkSubmission from "../../models/HomeworkSubmission";

interface HomeworkSubmissionViewProps {
    homework: Homework;
    onEditSubmission: (submission: HomeworkSubmission) => void;
}

export default function HomeworkSubmissionView(props: HomeworkSubmissionViewProps) {
    const { homework, onEditSubmission } = props;
    const { t } = useTranslation();
    const { toastError } = useAppData();
    const {
        mutate: submitHomework,
        isLoading
    } = useSubmitHomework(homework.courseId, homework.id);
    const { mutate: upload } = useUploadHomeworkSubmissionResource(homework.courseId, homework.id, () => {
    });
    const [files, setFiles] = useState<File[]>([]);
    const [isMediumWidth] = useMediaQuery("(min-width: 768px)");
    const [isSubmitting, setSubmitting] = useState(false);
    const [value, setValue] = useState<string | undefined>(undefined);

    const onSubmit = () => {
        setSubmitting(true);
        submitHomework({ value: value }, {
            onSuccess: (res) => {
                if (files.length === 0) {
                    setSubmitting(false);
                    onEditSubmission(res);
                } else {
                    uploadResource(res);
                }
            },
            onError: err => {
                setSubmitting(false);
                toastError(err)
            }
        });
    }

    const uploadResource = (submission: HomeworkSubmission, index = 0) => {
        const file = files[index];
        if (!file) {
            setSubmitting(false);
            onEditSubmission(submission);
            return;
        }
        upload(file, {
            onSuccess: (res) => {
                const temp = submission;
                temp.resources.push(res);
                uploadResource(temp, index + 1);
            },
            onError: err => {
                setSubmitting(false);
                toastError(err)
            }
        })
    }

    return (
        <Box bgColor={"background.secondary"} p={"1rem"} rounded={"0.75rem"} borderWidth={"1px"}
             borderColor={"divider.secondary"}>
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <VStack align={"stretch"} spacing={"1.5rem"}>

                    <VStack align={"stretch"} spacing={"0.5rem"}>
                        <Text fontSize={"lg"} fontWeight={"semibold"}>
                            {t("form.homework-submission.value")}
                        </Text>
                        <Form.Item>
                            <Input.TextArea
                                rows={4}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                placeholder={t("form.homework-submission.value")}
                            />
                        </Form.Item>
                        <HomeworkSubmissionResourcesView
                            files={files}
                            onFilesChange={res => setFiles(res)}
                        />
                    </VStack>

                    <Box>
                        <ButtonComponent
                            name={"press_btn_submit_homework"}
                            isLoading={isSubmitting}
                            title={t("button.finish")}
                            onClick={onSubmit}
                            block={!isMediumWidth}
                            size={isMediumWidth ? "md" : "lg"}
                        />
                    </Box>
                </VStack>
            </Form>
        </Box>

    )
}