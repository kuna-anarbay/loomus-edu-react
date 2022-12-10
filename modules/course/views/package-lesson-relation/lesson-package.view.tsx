import Lesson from "../../../program/models/Lesson";
import { HStack, Spinner, Text } from "@chakra-ui/react";
import { Checkbox } from "antd";
import CoursePackage from "../../models/CoursePackage";
import {
    useCreatePackageLessonRelation,
    useDeletePackageLessonRelation
} from "../../hooks/package-lesson-relation.hooks";
import { useAppData } from "../../../common/providers/app-data-provider";

interface LessonPackageViewProps {
    lesson: Lesson;
    coursePackage: CoursePackage;
    onEditLesson: (value: Lesson) => void;
}

export default function LessonPackageView(props: LessonPackageViewProps) {
    const { coursePackage, lesson, onEditLesson } = props;
    const { toastError } = useAppData();
    const {
        mutate: createRelation,
        isLoading: isCreating
    } = useCreatePackageLessonRelation(lesson.courseId, lesson.id);
    const {
        mutate: deleteRelation,
        isLoading: isDeleting
    } = useDeletePackageLessonRelation(lesson.courseId, lesson.id);
    const isLoading = isCreating || isDeleting;

    const onChange = () => {
        if (isLoading) return;
        const temp = [...lesson.packages];
        const contains = temp.map(p => p.id).includes(coursePackage.id);
        if (contains) {
            deleteRelation(coursePackage.id, {
                onSuccess: () => {
                    onEditLesson({
                        ...lesson,
                        packages: temp.filter(p => p.id !== coursePackage.id)
                    })
                },
                onError: err => toastError(err)
            })
        } else {
            createRelation(coursePackage.id, {
                onSuccess: () => {
                    onEditLesson({
                        ...lesson,
                        packages: [...temp, coursePackage]
                    })
                },
                onError: err => toastError(err)
            })
        }
    }

    return isLoading ? (
        <HStack as={"span"} margin={"0 6px 6px 0"} cursor={"pointer"} onClick={onChange}>
            <Spinner
                size={"sm"}
                color={"brand.base"}
            />
            <Text>
                {coursePackage.name}
            </Text>
        </HStack>
    ) : (
        <HStack as={"span"} margin={"0 6px 6px 0"} cursor={"pointer"} onClick={onChange}>
            <Checkbox checked={lesson.packages.map(p => p.id).includes(coursePackage.id)}/>
            <Text>
                {coursePackage.name}
            </Text>
        </HStack>
    );
}