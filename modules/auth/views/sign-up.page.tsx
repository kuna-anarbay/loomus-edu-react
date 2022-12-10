import { Box, Center, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import LinkComponent from "../../../components/utility/link.component";
import { Form, Input } from "antd";
import config from "../../../config";
import React, { useState } from "react";
import DeviceUtils from "../../../utils/device-utils";
import User from "../../user/models/User";
import { useTranslation } from "react-i18next";
import { useAppData } from "../../common/providers/app-data-provider";
import { useRegister, useRequestSmsCode } from "../hooks/auth-hooks";
import { useRouter } from "next/router";
import ButtonComponent from "../../../components/button/button.component";
import Route from "../../../utils/routing/route";
import PageLayout from "../../common/views/layout/page.layout";
import NumberUtils from "../../../utils/number-utils";

export default function SignUpPage() {
    const { t } = useTranslation();
    const { toastError, onLogin } = useAppData();
    const { push } = useRouter();
    const { mutate: requestCode, isLoading: isRequestingCode } = useRequestSmsCode();
    const { mutate: register, isLoading: isLoggingIn } = useRegister();
    const [body, setBody] = useState<Body>({
        phone: "",
        code: "",
        firstName: "",
        lastName: "",
        password: ""
    })
    const [emailSent, setEmailSent] = useState(false);
    const isLoading = isRequestingCode || isLoggingIn;

    interface Body {
        phone: string;
        code: string;
        firstName: string;
        lastName?: string;
        password: string;
    }

    const onSubmit = async () => {
        if (emailSent) {
            register({
                version: config.version,
                code: body.code.trim(),
                deviceType: DeviceUtils.deviceName(),
                os: DeviceUtils.deviceVersion(),
                phone: body.phone.trim(),
                platform: "DESKTOP",
                firstName: body.firstName.trim(),
                lastName: body.lastName?.trim(),
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
            requestCode({ phone: body.phone.trim(), purpose: "SIGN_UP" }, {
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
        <PageLayout title={t("page.sign-up.title")}>
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
                            {t("page.sign-up.title")}
                        </Heading>
                        <Text textAlign={"center"}>
                            {t("page.sign-up.description")}
                        </Text>
                    </VStack>

                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={onSubmit}
                    >
                        <Box>
                            <Form.Item
                                label={t("form.sign-up.first-name")}
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
                                    placeholder={t("form.sign-up.first-name")}
                                />
                            </Form.Item>

                            <Form.Item
                                label={t("form.sign-up.last-name")}
                            >
                                <Input
                                    value={body.lastName ?? ""}
                                    onChange={e => setBody({
                                        ...body,
                                        lastName: e.target.value
                                    })}
                                    placeholder={t("form.sign-up.last-name")}
                                />
                            </Form.Item>

                            <Form.Item
                                label={t("form.sign-up.phone-number")}
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
                                    placeholder={t("form.sign-in.phone-number")}
                                />
                            </Form.Item>

                            <Form.Item
                                label={t("form.sign-up.password")}
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
                                    placeholder={t("form.sign-up.password")}
                                />
                            </Form.Item>

                            {emailSent && (
                                <Form.Item
                                    label={t("form.sign-up.code")}
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
                                        placeholder={t("form.sign-up.code")}
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
                                title={t(emailSent ? "form.sign-up.sign-up" : "form.sign-up.request-code")}
                                logParams={{
                                    "emailStr": `${body.phone}`
                                }}
                            />

                        </Box>

                    </Form>

                    <VStack mt={"1.75rem"}>
                        <Box>
                            <Text as={"span"} fontSize={"sm"} fontWeight={"medium"} textColor={"label.secondary"}>
                                {t("page.sign-up.already-have-account")}
                            </Text>
                            {" "}
                            <LinkComponent href={Route.signIn()} fontSize={"sm"} fontWeight={"medium"}>
                                {t("page.sign-up.sign-in")}
                            </LinkComponent>
                        </Box>
                    </VStack>
                </Container>
            </Center>
        </PageLayout>
    )
}