import { Box, Collapse, HStack, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoAdd, IoChevronDown, IoChevronUp, IoEllipsisHorizontal, IoMenu, IoSwapVertical } from "react-icons/io5";
import Module from "../../models/Module";
import LessonsView from "../lessons/lessons.view";
import { useDeleteModule } from "../../hooks/module-hooks";
import EditLessonModal from "../lessons/edit-lesson.modal";
import Lesson from "../../models/Lesson";
import EditModuleModal from "./edit-module.modal";
import IconMenuComponent, { IconMenuComponentItem } from "../../../../components/menu/icon-menu.component";
import ButtonComponent from "../../../../components/button/button.component";
import IconButtonComponent from "../../../../components/button/icon-button.component";
import { useCourseData } from "../../../course/provider/course.provider";
import StringUtils from "../../../../utils/string-utils";

interface ModuleViewProps {
    module: Module;
    provided: any;
    isReordering: boolean;
    onEditModule: (module: Module) => void;
    onDeleteModule: (module: Module) => void;
    onEditLesson: (lesson: Lesson) => void;
    onDeleteLesson: (lesson: Lesson) => void;
    reorderLesson: (moduleId: number, source: number, destination: number) => void;
}

export default function ModuleView(props: ModuleViewProps) {
    const {
        module,
        provided,
        isReordering: isReorderingModules,
        reorderLesson,
        onEditModule,
        onDeleteModule,
        onEditLesson,
        onDeleteLesson
    } = props;
    const { isOpen: isLessonsOpen, onToggle } = useDisclosure();
    const { t } = useTranslation();
    const { isAdmin, isStudent, courseId } = useCourseData();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { mutate: deleteModule, isLoading: isDeleting } = useDeleteModule(courseId);
    const [isReordering, setIsReordering] = useState(false);

    const menuButtons = () => {
        const result: IconMenuComponentItem[] = [
            {
                name: "press_btn_edit_module",
                logParams: {
                    "moduleIdStr": `${module.id}`
                },
                title: t("button.edit"),
                onClick: () => onEditOpen()
            }
        ]
        if (module.lessons.length === 0) {
            result.push(
                {
                    name: "press_btn_delete_module",
                    logParams: {
                        "moduleIdStr": `${module.id}`
                    },
                    title: t("button.delete"),
                    danger: true,
                    textColor: "highlight.red.base",
                    onClick: () => handleDelete()
                }
            )
        }

        return result
    }

    const handleDelete = () => {
        deleteModule(module.id, {
            onSuccess: () => {
                onDeleteModule(module);
            }
        })
    }

    return (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
        >
            <Box
                bgColor={"background.base"}
                rounded={"0.75rem"}
                borderWidth={"1px"}
                borderColor={"divider.secondary"}
            >
                <HStack
                    px={"1rem"}
                    spacing={"0.25rem"}
                    py={"0.75rem"}
                >
                    <Box
                        flex={1}
                        cursor={"pointer"}
                        onClick={() => {
                            if (isReorderingModules) return;
                            onToggle();
                        }}
                    >
                        <Text fontSize={"sm"} fontWeight={"semibold"} textColor={"brand.base"}
                              style={{ fontVariant: "small-caps" }}>
                            {t("component.module.index").toLowerCase()} {module.index}
                        </Text>
                        <Text fontSize={"lg"} fontWeight={"semibold"}>
                            {module.name}
                        </Text>
                        <Text fontSize={"sm"} textColor={"label.secondary"}>
                            {module.lessons.length} {t(StringUtils.lessonsCount(module.lessons.length)).toLowerCase()}
                        </Text>
                    </Box>

                    {isDeleting && (
                        <Spinner/>
                    )}

                    {!isReorderingModules && isAdmin && (
                        <ButtonComponent
                            name={`press_btn_add_lesson`}
                            icon={IoAdd}
                            size={"xs"}
                            colorScheme={"success"}
                            title={t("component.module.add")}
                            onClick={onOpen}
                        />
                    )}

                    {!isReorderingModules && isAdmin && (
                        <ButtonComponent
                            name={`press_btn_reorder_lessons`}
                            icon={IoSwapVertical}
                            size={"xs"}
                            variant={"outline"}
                            colorScheme={"gray"}
                            title={t("button.reorder")}
                            onClick={() => setIsReordering(!isReordering)}
                        />
                    )}

                    {!isReorderingModules && !isDeleting && isAdmin && (
                        <IconMenuComponent
                            icon={IoEllipsisHorizontal}
                            items={menuButtons()}
                        />
                    )}

                    {isReorderingModules && isAdmin && (
                        <div {...provided.dragHandleProps}>
                            <IconButtonComponent
                                icon={IoMenu}
                                size={"1.75rem"}
                                name={"press_btn_reorder_module"}
                                logParams={{
                                    "moduleIdStr": `${module.id}`
                                }}
                            />
                        </div>
                    )}

                    {!isReorderingModules && (
                        <IconButtonComponent
                            name={`press_btn_toggle_lesson`}
                            icon={isLessonsOpen ? IoChevronUp : IoChevronDown}
                            onClick={onToggle}
                            size={"1.75rem"}
                        />
                    )}
                </HStack>

                <Collapse in={!isReorderingModules && isLessonsOpen}>
                    <LessonsView
                        reorderLesson={(source, destination) => reorderLesson(module.id, source, destination)}
                        onDeleteLesson={onDeleteLesson}
                        onEditLesson={onEditLesson}
                        isReordering={isReordering}
                        lessons={module.lessons.sort((c1, c2) => c1.index - c2.index)}
                    />
                </Collapse>

                <EditLessonModal
                    moduleId={module.id}
                    isOpen={isOpen}
                    onClose={onClose}
                    onEditLesson={onEditLesson}
                />

                <EditModuleModal
                    module={module}
                    isOpen={isEditOpen}
                    onClose={onEditClose}
                    onEditModule={onEditModule}
                />
            </Box>
        </div>
    )

}