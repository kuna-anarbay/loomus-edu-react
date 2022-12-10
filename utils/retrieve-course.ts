import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import Router from "next/router";
import CourseApi from "../modules/course/data/course/course-api";
import config from "../config";

export const retrieveCourse = async <Q extends ParsedUrlQuery>(context: GetServerSidePropsContext<Q>) => {
    const host = context.req.headers.host;
    const baseUrl = config.baseUrl;
    const username = context.query.username as string | undefined;

    if (!username) {
        await Router.replace(baseUrl);
    } else if (host) {
        const courseApi = new CourseApi();

        try {
            return await courseApi.findByUsername(username);
        } catch (err) {
            await Router.replace(baseUrl);
        }
    } else {
        await Router.replace(baseUrl);
    }
}