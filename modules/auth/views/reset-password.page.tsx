import { Box, Center, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { Form, Input } from "antd";
import config from "../../../config";
import React, { useState } from "react";
import DeviceUtils from "../../../utils/device-utils";
import User from "../../user/models/User";
import { useTranslation } from "react-i18next";
import { useAppData } from "../../common/providers/app-data-provider";
import { useRequestSmsCode, useResetPassword } from "../hooks/auth-hooks";
import { useRouter } from "next/router";
import ButtonComponent from "../../../components/button/button.component";
import PageLayout from "../../common/views/layout/page.layout";
import NumberUtils from "../../../utils/number-utils";

export default function ResetPasswordPage() {
    const { t } = useTranslation();
    const { toastError, onLogin } = useAppData();
    const { push } = useRouter();
    const { mutate: requestCode, isLoading: isRequestingCode } = useRequestSmsCode();
    const { mutate: resetPassword, isLoading: isLoggingIn } = useResetPassword();
    const [body, setBody] = useState<Body>({
        phone: "",
        code: "",
        password: ""
    })
    const [emailSent, setEmailSent] = useState(false);
    const isLoading = isRequestingCode || isLoggingIn;

    interface Body {
        phone: string;
        code: string;
        password: string;
    }

    const onSubmit = async () => {
        if (emailSent) {
            resetPassword({
                version: config.version,
                code: body.code.trim(),
                deviceType: DeviceUtils.deviceName(),
                os: DeviceUtils.deviceVersion(),
                phone: body.phone.trim(),
                platform: "DESKTOP",
                password: body.password.trim(),
            }, {
                onSuccess: async (user: User) => {
                    onLogin(user);
                    push("/");
                },
                onError: error => {
                    toastError(error);
                }
            });
        } else {
            requestCode({ phone: body.phone.trim(), purpose: "RESET_PASSWORD" }, {
                onSuccess: () => {
                    setEmailSent(true);
                },
                onError: error => {
                    toastError(error);
                }
            });
        }
    }

    return (
        <PageLayout title={t("page.reset-password.title")}>
            <Center
                px={"1rem"}
                py={"4rem"}
                minH={"calc(100vh - 4rem)"}
                w={"100vw"}
                h={"min-content"}
            >

                <Container maxW={"24rem"} bgColor={"background.base"} p={"0rem"}>

                    <VStack mb={"1.75rem"}>
                        <Heading as={"h1"} fontSize={"1.5rem"} textAlign={"center"}>
                            {t("page.reset-password.title")}
                        </Heading>
                        <Text textAlign={"center"}>
                            {t("page.reset-password.description")}
                        </Text>
                    </VStack>

                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={onSubmit}
                    >
                        <Box>

                            <Form.Item
                                label={t("form.reset-password.phone-number")}
                                required={true}
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Input
                                    type={"tel"}
                                    value={NumberUtils.maskedPhone(body.phone)}
                                    onChange={e => setBody({
                                        ...body,
                                        phone: NumberUtils.digits(e.target.value, 11)
                                    })}
                                    placeholder={t("form.reset-password.phone-number")}
                                />
                            </Form.Item>

                            {emailSent && (
                                <Form.Item
                                    label={t("form.reset-password.password")}
                                    required={true}
                                    rules={[
                                        {
                                            required: true
                                        }
                                    ]}
                                >
                                    <Input
                                        type={"password"}
                                        value={body.password}
                                        onChange={e => setBody({
                                            ...body,
                                            password: e.target.value.trim()
                                        })}
                                        placeholder={t("form.reset-password.password")}
                                    />
                                </Form.Item>
                            )}

                            {emailSent && (
                                <Form.Item
                                    label={t("form.reset-password.code")}
                                    required={true}
                                    rules={[
                                        {
                                            required: true
                                        }
                                    ]}
                                >
                                    <Input
                                        value={body.code}
                                        onChange={e => setBody({
                                            ...body,
                                            code: e.target.value
                                        })}
                                        placeholder={t("form.reset-password.code")}
                                    />
                                </Form.Item>
                            )}

                            <ButtonComponent
                                name={emailSent ? `press_btn_register` : `press_btn_request_register_email_code`}
                                type={"submit"}
                                size={"lg"}
                                isLoading={isLoading}
                                block={true}
                                blockText={true}
                                title={t(emailSent ? "form.reset-password.reset-password" : "form.reset-password.request-code")}
                                logParams={{
                                    "emailStr": `${body.phone}`
                                }}
                            />

                        </Box>

                    </Form>
                </Container>
            </Center>
        </PageLayout>
    )
}