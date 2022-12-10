import React from "react";
import { GetServerSideProps } from "next";
import { retrieveCourse } from "../../../../utils/retrieve-course";
import Course from "../../../../modules/course/models/Course";
import HomeworkPage from "../../../../modules/homework/views/homework/homework.page";

interface PageProps {
    course: Course;
    lessonId: number;
}

export default function Page(props: PageProps) {
    return <HomeworkPage lessonId={props.lessonId} course={props.course}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            course: await retrieveCourse(context),
            lessonId: parseInt(context.query.lessonId as string),
        }
    }
}