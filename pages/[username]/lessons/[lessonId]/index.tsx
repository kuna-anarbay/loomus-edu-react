import React from "react";
import { GetServerSideProps } from "next";
import LessonPage from "../../../../modules/program/views/lessons/lesson.page";
import { retrieveCourse } from "../../../../utils/retrieve-course";
import Course from "../../../../modules/course/models/Course";

interface PageProps {
    course: Course;
    lessonId: number;
}

export default function Page(props: PageProps) {
    return <LessonPage lessonId={props.lessonId} course={props.course}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            course: await retrieveCourse(context),
            lessonId: parseInt(context.query.lessonId as string),
        }
    }
}