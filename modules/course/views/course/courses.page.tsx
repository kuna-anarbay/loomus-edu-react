import { useTranslation } from "react-i18next";
import { Container, SimpleGrid } from "@chakra-ui/react";
import CourseCardComponent from "./course-card.component";
import PageLayout from "../../../common/views/layout/page.layout";
import React, { useEffect, useState } from "react";
import { useFindCourses } from "../../hooks/course.hooks";
import MemberCourse from "../../models/MemberCourse";
import PageHeaderComponent from "../../../../components/header/page-header.component";
import { useAppData } from "../../../common/providers/app-data-provider";
import User from "../../../user/models/User";
import { LocalStorageKey, useLocalStorage } from "../../../common/hooks/use-local-storage";


export default function CoursesPage() {
    const { t } = useTranslation();
    const { toastError, currentUser } = useAppData();
    const { get } = useLocalStorage();
    const { mutate: findCourses } = useFindCourses();
    const [courses, setCourses] = useState<MemberCourse[]>([]);

    useEffect(() => {
        if (get<User>(LocalStorageKey.CURRENT_USER)) {
            findCourses(undefined, {
                onSuccess: res => {
                    setCourses(res);
                },
                onError: err => toastError(err)
            });
        }
    }, [])

    return (
        <PageLayout>
            <Container maxW={"1080px"}>
                <PageHeaderComponent
                    title={t("page.courses.title")}
                    items={[]}
                />
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: "0.75rem", md: "1rem" }} mb={"2rem"}>
                    {courses.map(course => (
                        <CourseCardComponent key={`course-${course.course.id}`} course={course}/>
                    ))}
                </SimpleGrid>
            </Container>
        </PageLayout>
    );
}