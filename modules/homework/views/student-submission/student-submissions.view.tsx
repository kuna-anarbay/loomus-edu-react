import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Box, HStack, Spacer, StackDivider, Text, VStack } from "@chakra-ui/react";
import Homework from "../../models/Homework";
import { Dropdown, Menu, Pagination } from "antd";
import { useAppData } from "../../../common/providers/app-data-provider";
import FindHomeworkSubmissionsQuery from "../../data/homework-submission/dto/FindHomeworkSubmissionsQuery";
import { useGetHomeworkSubmissions } from "../../hooks/homework-submission-hooks";
import HomeworkSubmission, { HomeworkSubmissionStatus } from "../../models/HomeworkSubmission";
import StudentSubmissionView from "./student-submission.view";
import ArrayUtil from "../../../../utils/array-util";
import StringUtils from "../../../../utils/string-utils";
import { IoChevronDown } from "react-icons/io5";
import ButtonComponent from "../../../../components/button/button.component";
import DefaultLoader from "../../../../components/loader/default-loader";

interface StudentSubmissionsViewProps {
    homework: Homework;
}

export default function StudentSubmissionsView(props: StudentSubmissionsViewProps) {
    const { homework } = props;
    const { t } = useTranslation();
    const { toastError } = useAppData();
    const { mutate: getSubmissions, isLoading } = useGetHomeworkSubmissions(homework.courseId, homework.id);
    const [submissions, setSubmissions] = useState<HomeworkSubmission[]>([]);
    const [total, setTotal] = useState(0)
    const [query, setQuery] = useState<FindHomeworkSubmissionsQuery>({
        status: null,
        page: 0,
        size: 20
    });

    useEffect(() => {
        handleFindSubmissions(query);
    }, []);

    const handleFindSubmissions = (query: FindHomeworkSubmissionsQuery) => {
        getSubmissions(query, {
            onSuccess: (res) => {
                if (query.page === 0) {
                    setTotal(res.total);
                }
                setSubmissions(res.data);
            },
            onError: err => toastError(err)
        });
    }

    const handlePageChange = (page: number, size: number) => {
        const newQuery = {
            ...query,
            page: page,
            size: size
        };
        setQuery(newQuery);
        handleFindSubmissions(newQuery);
    }

    const onFilter = (status: HomeworkSubmissionStatus | null) => {
        const newQuery = {
            ...query,
            status: status,
            page: 0
        };
        setQuery(newQuery);
        handleFindSubmissions(newQuery);
    }

    return (
        <VStack align={"stretch"} spacing={"1rem"}>
            <HStack>
                <Box>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>
                        {t("component.student-homework-submissions.title")}
                    </Text>
                    <Text fontSize={"sm"} textColor={"label.secondary"}>
                        {total} {t(StringUtils.resultsCount(total)).toLowerCase()}
                    </Text>
                </Box>
                <Spacer/>

                <Dropdown overlay={(
                    <Menu>
                        <Menu.Item
                            onClick={() => {
                                onFilter(null);
                            }}
                        >
                            {t("enum.homework-submission-status.all")}
                        </Menu.Item>
                        <Menu.Item onClick={() => {
                            onFilter("PENDING");
                        }}>
                            {t("enum.homework-submission-status.pending")}
                        </Menu.Item>
                        <Menu.Item onClick={() => {
                            onFilter("ACCEPTED");
                        }}>
                            {t("enum.homework-submission-status.accepted")}
                        </Menu.Item>
                        <Menu.Item onClick={() => {
                            onFilter("DECLINED");
                        }}>
                            {t("enum.homework-submission-status.declined")}
                        </Menu.Item>
                    </Menu>
                )} trigger={["click"]}>
                    <ButtonComponent
                        icon={IoChevronDown}
                        iconPosition={"right"}
                        name={"press_btn_toggle_submissions_filter"}
                        variant={"outline"}
                        size={"sm"}
                        colorScheme={"gray"}
                        title={t(`enum.homework-submission-status.${query.status?.toLowerCase() ?? "all"}`)}
                    />
                </Dropdown>
            </HStack>

            {isLoading ? <DefaultLoader isLoading={true}/> : (
                <VStack align={"stretch"} spacing={"1rem"}>
                    <VStack
                        align={"stretch"}
                        spacing={"0.75rem"}
                        divider={<StackDivider borderColor={"divider.secondary"}/>}
                    >
                        {submissions.map(submission => (
                            <StudentSubmissionView
                                submission={submission}
                                onEditSubmission={submission => setSubmissions(ArrayUtil.addOrEdit(submissions, submission, "studentId"))}
                            />
                        ))}
                    </VStack>

                    <Pagination
                        defaultCurrent={1}
                        showSizeChanger={true}
                        size={"small"}
                        onChange={(page, size) => handlePageChange(Math.max(page - 1, 0), size)}
                        total={total}
                    />
                </VStack>
            )}
        </VStack>
    )
}