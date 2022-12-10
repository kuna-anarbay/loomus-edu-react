import { AspectRatio, Box, Center, HStack, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import LessonVideo, { LessonVideoType } from "../../models/LessonVideo";
import { useCourseData } from "../../../course/provider/course.provider";
import { Form, Input, Progress, Upload } from "antd";
import { IoChevronForward, IoClose, IoCloudUpload, IoEllipsisHorizontal } from "react-icons/io5";
import React, { useState } from "react";
import { useCreateLessonVideo, useDeleteLessonVideo, useUploadLessonVideo } from "../../hooks/lesson-video.hooks";
import Lesson from "../../models/Lesson";
import { useTranslation } from "react-i18next";
import { useAppData } from "../../../common/providers/app-data-provider";
import IconMenuComponent from "../../../../components/menu/icon-menu.component";
import CreateLessonVideoBody from "../../data/lesson-video/dto/CreateLessonVideoBody";
import ButtonComponent from "../../../../components/button/button.component";

interface LessonVideoViewProps {
    lesson: Lesson;
    video?: LessonVideo;
    onSetVideo: (video?: LessonVideo) => void;
}

export default function LessonVideoView(props: LessonVideoViewProps) {
    const { lesson, video, onSetVideo } = props;
    const { toastError } = useAppData();
    const { t } = useTranslation();
    const { isStaff } = useCourseData();
    const [progress, setProgress] = useState(0);
    const {
        mutate: uploadVideo,
        isLoading
    } = useUploadLessonVideo(lesson.courseId, lesson.id, res => setProgress(res), res => onSetVideo(res));
    const {
        mutate: createVideo,
        isLoading: isCreating
    } = useCreateLessonVideo(lesson.courseId, lesson.id);
    const {
        mutate: deleteVideo,
        isLoading: isDeleting
    } = useDeleteLessonVideo(lesson.courseId);
    const [type, setType] = useState<LessonVideoType | undefined>(undefined);
    const [body, setBody] = useState<CreateLessonVideoBody>({
        embedUrl: "",
        type: "YOUTUBE"
    });

    const saveToServer = (file: File) => {
        if (!onSetVideo) return;
        uploadVideo(file, {
            onError: err => toastError(err)
        });
    }

    const onSubmit = () => {
        if (!onSetVideo) return;
        createVideo(body, {
            onSuccess: res => onSetVideo(res),
            onError: err => toastError(err)
        });
    }

    const onDelete = () => {
        if (!onSetVideo) return;
        deleteVideo(lesson.id, {
            onSuccess: () => onSetVideo(undefined),
            onError: err => toastError(err)
        });
    }

    return (
        <>
            {video && (
                <AspectRatio ratio={1920 / 1080} h={{ md: "75vh" }} maxH={{ md: "75vh" }}>
                    {video.status === "complete" ? (
                        <Box position={"relative"}>
                            {video.type === "YOUTUBE" ? (
                                <iframe width={"100%"} height={"100%"}
                                        src="https://www.youtube.com/embed/ZHclkxRyQzQ?modestbranding=1&rel=0"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen

                                />
                            ) : (
                                <iframe
                                    src={video.embedUrl ?? ""}
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen={true}
                                    frameBorder="0"
                                    style={{
                                        width: "100%",
                                        height: "100%"
                                    }}/>
                            )}
                            {isStaff && (
                                <Box position={"absolute"} top={"1rem"} right={"1rem"}>
                                    {isDeleting ? <Spinner/> : (
                                        <IconMenuComponent
                                            icon={IoEllipsisHorizontal}
                                            items={[
                                                {
                                                    name: "press_btn_delete_video",
                                                    danger: true,
                                                    title: t("button.delete"),
                                                    onClick: () => onDelete()
                                                }
                                            ]}
                                        />
                                    )}
                                </Box>
                            )}
                        </Box>
                    ) : (
                        <Center>
                            <Text fontSize={"xl"} fontWeight={"bold"} textColor={"white"}>
                                {t("component.lesson-video.pending")}
                            </Text>
                        </Center>
                    )}
                </AspectRatio>
            )}
            {!video && isStaff && (
                <AspectRatio ratio={1920 / 1080} h={{ md: "75vh" }} maxH={{ md: "75vh" }}>
                    <Center>
                        <VStack align={"stretch"} spacing={"1rem"}
                                p={"1rem"}
                                bgColor={"background.base"}
                                rounded={"1rem"}
                                width={{ md: "30rem" }}
                        >
                            <Text fontSize={"lg"} fontWeight={"semibold"}>
                                {t("component.lesson-video.title")}
                            </Text>
                            {(!type || type === "YOUTUBE") && (
                                <HStack
                                    cursor={"pointer"}
                                    onClick={() => setType(type !== "YOUTUBE" ? "YOUTUBE" : undefined)}
                                    _hover={{
                                        textColor: "brand.base"
                                    }}
                                >
                                    <Image
                                        w={"2.5rem"}
                                        src={"/logo/youtube.png"}
                                        h={"1.75rem"}
                                    />
                                    <Text flex={1}>
                                        {t("component.lesson-video.youtube")}
                                    </Text>
                                    {type === "YOUTUBE" ? (
                                        <Text textColor={"highlight.red.base"}>
                                            <IoClose/>
                                        </Text>
                                    ) : (
                                        <Text>
                                            <IoChevronForward/>
                                        </Text>
                                    )}
                                </HStack>
                            )}
                            {(!type || type === "UPLOAD") && (
                                <HStack
                                    cursor={"pointer"}
                                    onClick={() => setType(type !== "UPLOAD" ? "UPLOAD" : undefined)}
                                    _hover={{
                                        textColor: "brand.base"
                                    }}
                                >
                                    <Center
                                        rounded={"0.375rem"}
                                        w={"2.5rem"}
                                        h={"1.75rem"}
                                        bgColor={"brand.base"}
                                        textColor={"white"}
                                    >
                                        <IoCloudUpload/>
                                    </Center>
                                    <Text flex={1}>
                                        {t("component.lesson-video.upload")}
                                    </Text>
                                    {type === "UPLOAD" ? (
                                        <Text textColor={"highlight.red.base"}>
                                            <IoClose/>
                                        </Text>
                                    ) : (
                                        <Text>
                                            <IoChevronForward/>
                                        </Text>
                                    )}
                                </HStack>
                            )}

                            {type === "UPLOAD" && (
                                <VStack align={"stretch"} spacing={"1rem"}>
                                    {isLoading && (
                                        <Progress percent={progress}/>
                                    )}
                                    <Upload.Dragger
                                        name={"file"}
                                        fileList={[]}
                                        beforeUpload={(e: any) => {
                                            saveToServer(e)
                                        }}
                                        accept={"*"}
                                    >
                                        <VStack py={"1rem"} spacing={"1rem"}>
                                            <Text fontSize={"1.75rem"}>
                                                <IoCloudUpload/>
                                            </Text>
                                            <Box>
                                                <Text fontSize={"md"}>
                                                    {t("component.upload-box.title")}
                                                </Text>
                                            </Box>
                                        </VStack>
                                    </Upload.Dragger>
                                </VStack>
                            )}
                            {type === "YOUTUBE" && (
                                <Form
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                >
                                    <Form.Item
                                        label={t("form.edit-lesson-video.embed-url")}
                                        required={true}
                                        rules={[
                                            {
                                                required: true
                                            }
                                        ]}
                                    >
                                        <Input
                                            value={body.embedUrl}
                                            onChange={e => setBody({
                                                ...body,
                                                embedUrl: e.target.value
                                            })}
                                            placeholder={t("form.edit-lesson-video.embed-url")}
                                        />
                                    </Form.Item>

                                    <ButtonComponent
                                        name={"press_btn_save_lesson_video"}
                                        isLoading={isCreating}
                                        title={t("button.save")}
                                        type={"submit"}
                                        onClick={onSubmit}
                                    />
                                </Form>
                            )}
                        </VStack>
                    </Center>
                </AspectRatio>
            )}
        </>

    )
}