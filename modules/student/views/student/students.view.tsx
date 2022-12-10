import { useFindCourseStudents } from "../../hooks/student.hooks";
import React, { useEffect, useState } from "react";
import Student from "../../models/Student";
import { useTranslation } from "react-i18next";
import { Box, HStack, Spacer, Text, useDisclosure, useMediaQuery, VStack } from "@chakra-ui/react";
import { Form, Input, Pagination, Table } from "antd";
import EditStudentButton from "./edit-student.button";
import ArrayUtil from "../../../../utils/array-util";
import { useAppData } from "../../../common/providers/app-data-provider";
import SortComponent from "../../../../components/miscellaneous/sort.component";
import FindStudentsQuery from "../../data/student/dto/FindStudentsQuery";
import StudentView from "./student.view";
import ButtonComponent from "../../../../components/button/button.component";
import { IoAdd } from "react-icons/io5";
import EditStudentModal from "./edit-student.modal";
import StringUtils from "../../../../utils/string-utils";
import ImportStudentsButton from "./import-students.button";
import { useCourseData } from "../../../course/provider/course.provider";
import FilterComponent from "../../../../components/miscellaneous/filter.component";
import NumberUtils from "../../../../utils/number-utils";

interface StudentsViewProps {
    courseId: number;
}

export default function StudentsView(props: StudentsViewProps) {
    const { courseId } = props;
    const { toastError } = useAppData();
    const { mutate: findCourseStudents, isLoading } = useFindCourseStudents(courseId);
    const { t } = useTranslation();
    const { packages } = useCourseData();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [isMediumWidth] = useMediaQuery("(min-width: 768px)");
    const [students, setStudents] = useState<Student[]>([]);
    const [total, setTotal] = useState(0);
    const [query, setQuery] = useState<FindStudentsQuery>({
        packageId: null,
        isActive: null,
        orderBy: "id",
        orderDirection: "asc",
        page: 0,
        size: 10
    });

    useEffect(() => {
        handleFindStudents(query);
    }, []);

    const handleFindStudents = (query: FindStudentsQuery) => {
        findCourseStudents(query, {
            onSuccess: (res) => {
                setStudents(res.data);
                if (query.page === 0) {
                    setTotal(res.total);
                }
            },
            onError: error => toastError(error)
        });
    }

    const handlePageChange = (page: number, size: number) => {
        const newQuery = {
            ...query,
            page: page,
            size: size
        };
        setQuery(newQuery);
        handleFindStudents(newQuery);
    }

    const sort = (field: string, direction: string) => {
        const newQuery: FindStudentsQuery = {
            ...query,
            page: 0,
            size: 10,
            orderDirection: direction,
            orderBy: field
        };
        setQuery(newQuery);
        handleFindStudents(newQuery);
    }

    const onSearch = (value: string) => {
        const newQuery = {
            ...query,
            page: 0,
            query: value
        };
        setQuery(newQuery);
        handleFindStudents(newQuery);
    }

    const onFilterByPackageId = (value: number | null) => {
        const newQuery = {
            ...query,
            page: 0,
            packageId: value
        };
        setQuery(newQuery);
        handleFindStudents(newQuery);
    }

    return (
        <Box>
            <VStack fontSize={"md"} align={"stretch"} spacing={"1rem"}>
                <HStack align={"start"}>
                    <Box>
                        <Text fontSize={"lg"} fontWeight={"semibold"}>
                            {t("component.students.title")}
                        </Text>
                        <Text fontSize={"sm"} textColor={"label.secondary"}>
                            {total} {t(StringUtils.resultsCount(total)).toLowerCase()}
                        </Text>
                    </Box>
                    <Spacer/>
                    {packages.length > 0 && (
                        <ImportStudentsButton
                            courseId={courseId}
                            onEditStudents={res => setStudents([...students, ...res])}
                        />
                    )}
                    {packages.length > 0 && (
                        <ButtonComponent
                            name={`press_btn_add_student`}
                            key={"add-staff-btn"}
                            icon={IoAdd}
                            size={"xs"}
                            title={t("button.add")}
                            colorScheme={"success"}
                            onClick={() => onOpen()}
                        />
                    )}
                </HStack>
                <Form.Item>
                    <Input.Search
                        placeholder={t("component.students.search")}
                        onSearch={onSearch}
                    />
                </Form.Item>
                <VStack align={"stretch"} spacing={"1rem"}>
                    <Table
                        sticky={{
                            offsetHeader: 44
                        }}
                        scroll={{
                            x: 775
                        }}
                        tableLayout={undefined}
                        loading={isLoading}
                        bordered={true}
                        pagination={false}
                        dataSource={students}
                        columns={[
                            {
                                key: "id",
                                fixed: isMediumWidth ? "left" : undefined,
                                title: (
                                    <HStack>
                                        <Text>
                                            id
                                        </Text>
                                        <Spacer/>

                                        <SortComponent
                                            name={"id"}
                                            orderBy={query.orderBy}
                                            orderDirection={query.orderDirection}
                                            onSort={sort}
                                        />
                                    </HStack>
                                ),
                                width: 75,
                                render: (student: Student) => student.id
                            },
                            {
                                key: "fullName",
                                fixed: isMediumWidth ? "left" : undefined,
                                title: (
                                    <HStack>
                                        <Text>
                                            {t("table.students.full-name")}
                                        </Text>
                                        <Spacer/>

                                        <SortComponent
                                            name={"firstName"}
                                            orderBy={query.orderBy}
                                            orderDirection={query.orderDirection}
                                            onSort={sort}
                                        />
                                    </HStack>
                                ),
                                width: 200,
                                render: (student: Student) => (
                                    <StudentView
                                        as={"header"}
                                        student={student}
                                        onEditStudent={value => setStudents(ArrayUtil.addOrEdit(students, value))}
                                    />
                                )
                            },
                            {
                                key: "email",
                                title: t("table.students.phone-number"),
                                width: 200,
                                render: (student: Student) => NumberUtils.maskedPhone(student.phone)
                            },
                            {
                                key: "package",
                                title: (
                                    <HStack>
                                        <Text>
                                            {t("table.students.package")}
                                        </Text>
                                        <Spacer/>

                                        <FilterComponent
                                            currentId={query.packageId}
                                            onFilter={onFilterByPackageId}
                                            items={packages.map(item => {
                                                return {
                                                    id: item.id,
                                                    label: item.name
                                                }
                                            })}
                                        />
                                    </HStack>
                                ),
                                width: 150,
                                render: (student: Student) => (
                                    <VStack
                                        cursor={"pointer"}
                                        align={"stretch"} spacing={"0rem"}
                                    >
                                        <Text fontSize={"15px"} fontWeight={"medium"}>
                                            {packages.find(p => p.id === student.packageId)?.name}
                                        </Text>
                                        <Text fontSize={"xs"} textColor={"label.secondary"}>
                                            {student.isActive && t("table.students.is-active")}
                                        </Text>
                                    </VStack>
                                )
                            },
                            {
                                key: "progress",
                                title: t("table.students.progress"),
                                width: 200,
                                render: (student: Student) => (
                                    <Text>
                                        {student.progress.opened} / {student.progress.passed} / {student.progress.total}
                                    </Text>
                                )
                            },
                            {
                                key: "action",
                                title: "",
                                fixed: isMediumWidth ? "right" : undefined,
                                width: 50,
                                render: (student: Student) => (
                                    <>
                                        <EditStudentButton
                                            student={student}
                                            onDeleteStudent={student => setStudents(students.filter(s => s.id !== student.id))}
                                            onEditStudent={value => setStudents(ArrayUtil.addOrEdit(students, value))}
                                        />
                                    </>
                                )
                            }
                        ]}
                    />

                    <Pagination
                        defaultCurrent={1}
                        showSizeChanger={true}
                        size={"small"}
                        onChange={(page, size) => handlePageChange(Math.max(page - 1, 0), size)}
                        total={total}
                    />
                </VStack>
            </VStack>

            <EditStudentModal
                courseId={courseId}
                isOpen={isOpen}
                onClose={onClose}
                onEditStudent={res => setStudents([...students, res])}
            />
        </Box>
    )


}