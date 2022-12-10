import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { Form, Input, Select } from "antd";
import StringUtils from "../../../../utils/string-utils";
import { useAppData } from "../../../common/providers/app-data-provider";
import { useReplyHomeworkSubmission } from "../../hooks/homework-submission-hooks";
import HomeworkSubmission, { HomeworkSubmissionStatus } from "../../models/HomeworkSubmission";
import ReplySubmissionBody from "../../data/homework-submission/dto/ReplySubmissionBody";
import ButtonComponent from "../../../../components/button/button.component";
import DateUtils from "../../../../utils/date-utils";
import StudentSubmissionResourcesView from "./student-submission-resources-view";

interface StudentSubmissionViewProps {
    submission: HomeworkSubmission;
    onEditSubmission: (value: HomeworkSubmission) => void;
}

export default function StudentSubmissionView(props: StudentSubmissionViewProps) {
    const { submission, onEditSubmission } = props;
    const { t } = useTranslation();
    const { toastError, toastSuccess } = useAppData();
    const {
        mutate: replyHomework,
        isLoading
    } = useReplyHomeworkSubmission(submission.courseId, submission.homeworkId, submission.studentId);
    const [body, setBody] = useState<ReplySubmissionBody>({
        status: submission.status,
        notes: submission.notes
    });

    const onSubmit = () => {
        replyHomework(body, {
            onSuccess: () => {
                toastSuccess(t("toast.success.saved"));
                onEditSubmission({
                    ...submission,
                    ...body
                });
            }, onError: error => toastError(error)
        })
    }

    return (
        <Box>
            <VStack
                align={"stretch"} spacing={"0.75rem"}
                px={"1rem"} py={"0.75rem"} rounded={"0.75rem"}
                borderWidth={"1px"} borderColor={"divider.secondary"}
            >
                <HStack>
                    <Box flex={1}>
                        <Text fontSize={"md"} fontWeight={"semibold"}>
                            {StringUtils.fullName(submission.student)}
                        </Text>
                        <Text fontSize={"xs"} textColor={"label.secondary"}>
                            {t("component.student-homework-submission.submitted-at")}: {DateUtils.format(submission.submittedAt, "DD.MM.YYYY, HH:mm")}
                        </Text>
                    </Box>

                    <Box as={"span"} fontSize={"sm"} px={"8px"} py={"3px"}
                         rounded={"4px"} lineHeight={"120%"}
                         bgColor={HomeworkSubmission.statusColor(submission)}
                         textColor={"white"}
                    >
                        {t(`enum.homework-submission-status.${submission.status.toLowerCase()}`)}
                    </Box>
                </HStack>

                <Text fontSize={"md"}>
                    {submission.value}
                </Text>
                {submission.resources.length > 0 && (
                    <StudentSubmissionResourcesView resources={submission.resources}/>
                )}

                <Divider borderColor={"divider.secondary"}/>

                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Form.Item
                        label={t("form.reply-homework-submission.status")}
                        required={true}
                        rules={[
                            {
                                required: true
                            }
                        ]}
                    >
                        <Select
                            value={body.status}
                            onSelect={(value: HomeworkSubmissionStatus) => setBody({
                                ...body,
                                status: value
                            })}
                        >
                            <Select.Option value={"PENDING"}>
                                {t("enum.homework-submission-status.pending")}
                            </Select.Option>
                            <Select.Option value={"ACCEPTED"}>
                                {t("enum.homework-submission-status.accepted")}
                            </Select.Option>
                            <Select.Option value={"DECLINED"}>
                                {t("enum.homework-submission-status.declined")}
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={t("form.reply-homework-submission.notes")}>
                        <Input.TextArea
                            value={body.notes}
                            onChange={e => setBody({
                                ...body,
                                notes: e.target.value
                            })}
                            placeholder={t("form.reply-homework-submission.notes")}
                        />
                    </Form.Item>

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
            </VStack>
        </Box>

    )
}