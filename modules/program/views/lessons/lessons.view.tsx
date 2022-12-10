import { Box } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Lesson from "../../models/Lesson";
import LessonView from "./lesson.view";

interface LessonsViewProps {
    lessons: Lesson[];
    isReordering: boolean;
    reorderLesson: (source: number, destination: number) => void;
    onEditLesson: (lesson: Lesson) => void;
    onDeleteLesson: (lesson: Lesson) => void;
}

export default function LessonsView(props: LessonsViewProps) {
    const { isReordering, lessons, reorderLesson, onEditLesson, onDeleteLesson } = props;

    const handleOnDragEnd = (result: any) => {
        if (result.destination.index === undefined || result.source.index === undefined) return;
        if (result.destination.index === result.source.index) return;
        reorderLesson(result.source.index, result.destination.index);
    }

    return (
        <Box>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="lessons">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {lessons.map((lesson, index) => (
                                <Draggable key={`lesson-${lesson.id}`} draggableId={`${lesson.id}`}
                                           index={index}>
                                    {(provided) => (
                                        <LessonView
                                            key={`lesson-${lesson.id}`}
                                            lesson={lesson}
                                            provided={provided}
                                            isReordering={isReordering}
                                            onEditLesson={onEditLesson}
                                            onDeleteLesson={onDeleteLesson}
                                        />
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

        </Box>
    )

}