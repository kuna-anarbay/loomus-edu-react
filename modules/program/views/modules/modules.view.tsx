import { Box, VStack } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Module from "../../models/Module";
import ModuleView from "./module.view";
import Lesson from "../../models/Lesson";

interface ModulesViewProps {
    modules: Module[];
    isReordering: boolean;
    reorderModule: (source: number, destination: number) => void;
    reorderLesson: (moduleId: number, source: number, destination: number) => void;
    onEditModule: (module: Module) => void;
    onDeleteModule: (module: Module) => void;
    onEditLesson: (lesson: Lesson) => void;
    onDeleteLesson: (lesson: Lesson) => void;
}

export default function ModulesView(props: ModulesViewProps) {
    const {
        isReordering,
        modules,
        reorderModule,
        onEditModule,
        onEditLesson,
        onDeleteLesson,
        onDeleteModule,
        reorderLesson
    } = props;

    const handleOnDragEnd = (result: any) => {
        if (result.destination.index === undefined || result.source.index === undefined) return;
        if (result.destination.index === result.source.index) return;
        reorderModule(result.source.index, result.destination.index);
    }

    return (
        <Box>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="modules">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <VStack align="stretch" spacing={"0.75rem"}>
                                {modules.map((module, index) => (
                                    <Draggable key={`module-${module.id}`} draggableId={`${module.id}`}
                                               index={index}>
                                        {(provided) => (
                                            <ModuleView
                                                key={`module-${module.id}`}
                                                module={module}
                                                provided={provided}
                                                isReordering={isReordering}
                                                onEditLesson={onEditLesson}
                                                onDeleteLesson={onDeleteLesson}
                                                onEditModule={onEditModule}
                                                onDeleteModule={onDeleteModule}
                                                reorderLesson={reorderLesson}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                            </VStack>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    )

}