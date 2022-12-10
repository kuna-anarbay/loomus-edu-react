import React from "react";
import { GetServerSideProps } from "next";
import { retrieveCourse } from "../../utils/retrieve-course";
import CourseHomePage from "../../modules/course/views/course/course-home.page";
import Course from "../../modules/course/models/Course";

interface PageProps {
    course: Course;
}

export default function Page(props: PageProps) {
    return <CourseHomePage course={props.course}/>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            course: await retrieveCourse(context)
        }
    }
}