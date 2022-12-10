import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReorderLesson } from "../../hooks/lesson-hooks";
import { useFindModules, useReorderModule } from "../../hooks/module-hooks";
import { Box, HStack, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { IoAdd, IoSwapVertical } from "react-icons/io5";
import ArrayUtil from "../../../../utils/array-util";
import { useCourseData } from "../../../course/provider/course.provider";
import ButtonComponent from "../../../../components/button/button.component";
import Course from "../../../course/models/Course";
import Lesson from "../../models/Lesson";
import Module from "../../models/Module";
import EditModuleModal from "../modules/edit-module.modal";
import ModulesView from "../modules/modules.view";

interface AllLessonsViewProps {
    course: Course;
}

export default function AllLessonsView(props: AllLessonsViewProps) {
    const { course } = props;
    const { isAdmin } = useCourseData();
    const { t } = useTranslation();
    const { mutate: findModules } = useFindModules();
    const { mutate: reorderModule } = useReorderModule(course.id);
    const { mutate: reorderLesson } = useReorderLesson(course.id);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modules, setModules] = useState<Module[]>([]);
    const [isReordering, setIsReordering] = useState(false);

    useEffect(() => {
        handleFindModules(course.id);
    }, []);


    const handleFindModules = (courseId: number) => {
        findModules(courseId, {
            onSuccess: res => {
                const temp = res.sort((m1, m2) => m1.index - m2.index).map((module) => {
                    const tempLessons =
                        module.lessons.sort((m1, m2) => m1.index - m2.index);

                    return Module.copy(module, tempLessons);
                });
                setModules(temp);
            }
        })
    }

    const editLesson = (lesson: Lesson) => {
        const temp = [...modules];
        const moduleIndex = temp.findIndex(m => m.id === lesson.moduleId);
        if (moduleIndex == -1) return;
        temp[moduleIndex].lessons = ArrayUtil.addOrEdit(temp[moduleIndex].lessons, lesson);
        setModules(temp);
    }

    const deleteLesson = (lesson: Lesson) => {
        const temp = [...modules];
        const moduleIndex = temp.findIndex(m => m.id === lesson.moduleId);
        if (moduleIndex == -1) return;
        temp[moduleIndex].lessons = temp[moduleIndex].lessons.filter(l => l.id !== lesson.id);
        setModules(temp);
    }

    const editModules = (modules: Module[]) => {
        setModules(modules);
    }

    const handleReorderModule = (source: number, destination: number) => {
        const moduleId = modules[source].id;
        const currentSections = [...modules];
        editModules(ArrayUtil.reorder(modules, source, destination));
        reorderModule({
            moduleId: moduleId,
            body: { index: destination + 1 }
        }, {
            onError: () => {
                editModules(currentSections);
            }
        });
    }


    const handleReorderLesson = (moduleId: number, source: number, destination: number) => {
        const moduleIndex = modules.findIndex(s => s.id === moduleId);
        if (moduleIndex === -1) return;
        const temp = [...modules];
        const currentModules = [...modules];
        const module = modules[moduleIndex];
        const lessonId = module.lessons[source].id;
        temp[moduleIndex].lessons = ArrayUtil.reorder(module.lessons, source, destination);
        editModules(temp);

        reorderLesson({
            lessonId: lessonId,
            body: { index: destination + 1 }
        }, {
            onError: () => {
                editModules(currentModules);
            }
        });
    }


    return (
        <Box>
            <VStack align={"stretch"} spacing={"1rem"} flexGrow={1}>
                {isAdmin && (
                    <HStack>
                        <Text fontSize={"lg"} fontWeight={"semibold"}>
                            {t("component.modules.title")}
                        </Text>

                        <Spacer/>
                        {isAdmin && (
                            <ButtonComponent
                                name={`press_btn_add_module`}
                                colorScheme={"success"}
                                icon={IoAdd}
                                size={"xs"}
                                title={t("component.modules.add")}
                                onClick={onOpen}
                            />
                        )}

                        {isAdmin && (
                            <ButtonComponent
                                name={`press_btn_reorder_modules`}
                                icon={IoSwapVertical}
                                variant={"outline"}
                                size={"xs"}
                                colorScheme={"gray"}
                                title={t("button.reorder")}
                                onClick={() => setIsReordering(!isReordering)}
                            />
                        )}
                    </HStack>
                )}

                <ModulesView
                    modules={modules.sort((c1, c2) => c1.index - c2.index)}
                    isReordering={isReordering}
                    reorderModule={handleReorderModule}
                    reorderLesson={handleReorderLesson}
                    onEditModule={(module) => setModules(ArrayUtil.addOrEdit(modules, module))}
                    onDeleteModule={(module) => setModules(modules.filter(m => m.id !== module.id))}
                    onEditLesson={editLesson}
                    onDeleteLesson={deleteLesson}
                />
            </VStack>


            <EditModuleModal
                isOpen={isOpen}
                onClose={onClose}
                onEditModule={res => editModules(ArrayUtil.addOrEdit(modules, res))}
            />
        </Box>
    )

}