import React, { createContext, ReactNode, useContext, useState } from "react";
import ArrayUtil from "../../../utils/array-util";
import Course from "../../course/models/Course";
import Staff from "../../staff/models/Staff";
import { useFindCourseStaffs } from "../../staff/hooks/staff.hooks";
import { useFindCourseRole, useFindCourseSubscription } from "../hooks/course.hooks";
import CoursePackage from "../models/CoursePackage";
import { useFindCoursePackages } from "../hooks/course-package.hooks";
import { useAppData } from "../../common/providers/app-data-provider";
import Lesson from "../../program/models/Lesson";
import { useFindModules } from "../../program/hooks/module-hooks";
import CourseSubscription from "../models/CourseSubscription";

type CourseDataType = {
    courseId: number;
    isLoaded: boolean;

    course?: Course;
    subscription?: CourseSubscription;
    isOwner: boolean;
    isAdmin: boolean;
    isStaff: boolean;
    isStudent: boolean;

    nextLesson: (lessonId: number) => Lesson | undefined;
    prevLesson: (lessonId: number) => Lesson | undefined;

    staffs: Staff[];
    editStaff: (staff: Staff) => void;
    deleteStaff: (staff: Staff) => void;

    packages: CoursePackage[];
    editPackage: (value: CoursePackage) => void;
    deletePackage: (value: CoursePackage) => void;

    configure: (course: Course) => void;
}

interface CourseDataProviderProps {
    children: ReactNode;
}

const CourseData = createContext<CourseDataType>(undefined!);

export function CourseDataProvider(props: CourseDataProviderProps) {
    const { children } = props;
    const { toastError } = useAppData();
    const { mutate: findStaffs } = useFindCourseStaffs();
    const { mutate: findPackages } = useFindCoursePackages();
    const { mutate: findRole, data: role } = useFindCourseRole();
    const { mutate: findModules } = useFindModules();
    const { mutate: findSubscription } = useFindCourseSubscription();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [currentCourseId, setCurrentCourseId] = useState(-1);
    const [course, setCourse] = useState<Course | undefined>(undefined);
    const [subscription, setSubscription] = useState<CourseSubscription | undefined>(undefined);
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [packages, setPackages] = useState<CoursePackage[]>([]);
    const [isLoaded, setLoaded] = useState(false);

    const configure = (course: Course) => {
        if (course.id !== currentCourseId) {
            setCurrentCourseId(course.id);
            setCourse(course);
            handleFindRole(course.id);
            handleFindSections(course.id);
        }
    }

    const handleFindRole = (courseId: number) => {
        findRole(courseId, {
            onSuccess: res => {
                setLoaded(true);
                if (res.role !== "STUDENT") {
                    handleFindStaffs(courseId);
                    handleFindPackages(courseId);
                }
                if (res.role == "ADMIN" || res.role === "OWNER") {
                    handleFindSubscription(courseId);
                }
            },
            onError: err => toastError(err)
        })
    }

    const handleFindSubscription = (courseId: number) => {
        findSubscription(courseId, {
            onSuccess: res => {
                setSubscription(res);
            },
            onError: err => toastError(err)
        })
    }

    const handleFindSections = (courseId: number) => {
        findModules(courseId, {
            onSuccess: res => {
                let temp: Lesson[] = [];
                let index = 0;
                res.sort((m1, m2) => m1.index - m2.index)?.forEach(module => {
                    module.lessons.sort((m1, m2) => m1.index - m2.index).forEach(lesson => {
                        temp.push(lesson);
                        index += 1;
                    });
                });

                setLessons(temp);
            }
        });
    }

    const handleFindStaffs = (courseId: number) => {
        findStaffs(courseId, {
            onSuccess: res => setStaffs(res)
        })
    }

    const handleFindPackages = (courseId: number) => {
        findPackages(courseId, {
            onSuccess: res => setPackages(res)
        })
    }

    const editStaff = (staff: Staff) => {
        setStaffs(ArrayUtil.addOrEdit(staffs, staff));
    }

    const deleteStaff = (staff: Staff) => {
        setStaffs(staffs.filter(s => s.id !== staff.id));
    }

    const editPackage = (value: CoursePackage) => {
        setPackages(ArrayUtil.addOrEdit(packages, value));
    }

    const deletePackage = (value: CoursePackage) => {
        setPackages(packages.filter(s => s.id !== value.id));
    }

    const nextLesson = (lessonId: number): Lesson | undefined => {
        const index = lessons.findIndex(l => l.id === lessonId);
        if (index === -1) return undefined;

        return lessons[index + 1];
    }

    const prevLesson = (lessonId: number): Lesson | undefined => {
        const index = lessons.findIndex(l => l.id === lessonId);
        if (index === -1) return undefined;

        return lessons[index - 1];
    }

    return (
        <CourseData.Provider
            value={{
                courseId: currentCourseId,
                isLoaded: isLoaded,
                course: course,
                subscription: subscription,
                isOwner: role?.role === "OWNER",
                isAdmin: role?.role === "OWNER" || role?.role === "ADMIN",
                isStaff: role?.role !== undefined && role.role !== "STUDENT",
                isStudent: role?.role === "STUDENT",
                staffs: staffs,
                packages: packages,
                configure: configure,
                editStaff: editStaff,
                deleteStaff: deleteStaff,
                editPackage: editPackage,
                deletePackage: deletePackage,
                nextLesson: nextLesson,
                prevLesson: prevLesson
            }}
        >
            {children}
        </CourseData.Provider>
    )
}

export const useCourseData = () => useContext(CourseData);