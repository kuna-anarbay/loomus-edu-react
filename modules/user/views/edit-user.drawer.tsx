import { Box, HStack, Image, VStack } from "@chakra-ui/react";
import Compress from "browser-image-compression";
import { useTranslation } from "react-i18next";
import { IoTrash } from "react-icons/io5";
import { useDeleteAvatar, useEditProfile, useUploadAvatar } from "../hooks/user-hooks";
import { useAppData } from "../../common/providers/app-data-provider";
import inputAccept from "../../../utils/file/input-accept";
import avatarPath from "../../../utils/file/avatar-path";
import UploadButtonComponent from "../../../components/button/upload-button.component";
import EditUserBody from "../data/dto/EditUserBody";
import React, { useState } from "react";
import { Form, Input } from "antd";
import StringUtils from "../../../utils/string-utils";
import ButtonComponent from "../../../components/button/button.component";
import { useValidation } from "react-class-validator";
import User from "../models/User";
import DrawerComponent from "../../../components/drawer/drawer.component";

interface EditUserDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

export default function EditUserDrawer(props: EditUserDrawerProps) {
    const { isOpen, onClose, user } = props;
    const { onLogin, toastSuccess, toastError } = useAppData();
    const { t } = useTranslation();
    const { mutate: editProfile, isLoading } = useEditProfile();
    const { mutate: uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar();
    const { mutate: deleteAvatar, isLoading: isDeletingAvatar } = useDeleteAvatar();
    const [isCompressing, setIsCompressing] = useState(false);
    const [validate] = useValidation(EditUserBody);
    const [body, setBody] = useState<EditUserBody>({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        language: user.language ?? ""
    })
    const isUploading = isCompressing || isUploadingAvatar;

    const onSubmit = async () => {
        try {
            if (!await validate(body)) return;
            editProfile(body, {
                onSuccess: () => {
                    onLogin({
                        ...user,
                        firstName: body.firstName,
                        lastName: body.lastName
                    });
                    toastSuccess(t("toast.success.profile-edited"));
                },
                onError: error => toastError(error)
            });
        } catch (e) {
            console.log(e);
        }
    }

    const onFileSelect = async (file: File) => {
        if (isUploading) return;
        const options = {
            maxSizeMB: 1,
            useWebWorker: true
        }
        setIsCompressing(true);
        const blob = await Compress(file, options);
        setIsCompressing(false);
        const imageFile = new File([blob], file.name, { type: file.type });
        const formData = new FormData();
        formData.set("file", imageFile);
        uploadAvatar(formData, {
            onSuccess: (image) => {
                onLogin({
                    ...user,
                    avatarUrl: image
                })
            },
            onError: error => toastError(error)
        });
    }

    const onDeleteAvatar = () => {
        deleteAvatar(undefined, {
            onSuccess: () => {
                onLogin({
                    ...user,
                    avatarUrl: undefined
                })
            },
            onError: error => toastError(error)
        });
    }

    return (
        <DrawerComponent
            isOpen={isOpen}
            onClose={onClose}
            header={t("form.edit-user.title")}
        >
            <VStack justifyContent={"course"} mb={"1.25rem"}>
                <Image
                    alt={user ? StringUtils.fullName(user) : ""}
                    objectFit={"cover"}
                    rounded={"full"}
                    width={{ base: "calc(100vw - 8rem)", md: "15rem" }}
                    height={{ base: "calc(100vw - 8rem)", md: "15rem" }}
                    src={avatarPath(user?.avatarUrl)}
                />
                <HStack>

                    <Box>
                        <UploadButtonComponent
                            source={"USER_AVATAR"}
                            title={t("form.edit-user.select-avatar")}
                            isLoading={isUploading}
                            accept={inputAccept.avatar}
                            onUpload={onFileSelect}
                        />
                    </Box>
                    {user?.avatarUrl && (
                        <ButtonComponent
                            name={`press_btn_delete_user_avatar`}
                            onClick={onDeleteAvatar}
                            icon={IoTrash}
                            title={t("form.edit-user.delete-avatar")}
                            colorScheme={"danger"}
                            variant={"outline"}
                            size={"sm"}
                            isLoading={isDeletingAvatar}
                        />
                    )}
                </HStack>
            </VStack>

            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >

                <Form.Item
                    label={t("form.edit-user.first-name")}
                    required={true}
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <Input
                        value={body.firstName}
                        onChange={e => setBody({
                            ...body,
                            firstName: e.target.value
                        })}
                        placeholder={t("form.edit-user.first-name")}
                    />
                </Form.Item>

                <Form.Item
                    label={t("form.edit-user.last-name")}
                >
                    <Input
                        value={body.lastName}
                        onChange={e => setBody({
                            ...body,
                            lastName: e.target.value
                        })}
                        placeholder={t("form.edit-user.last-name")}
                    />
                </Form.Item>

                <ButtonComponent
                    name={"press_btn_save_user"}
                    title={t("button.save")}
                    type={"submit"}
                    isLoading={isLoading}
                    onClick={onSubmit}
                />

            </Form>
        </DrawerComponent>
    )
}