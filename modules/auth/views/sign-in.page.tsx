import { Box, Center, Container, Heading, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../../components/button/button.component";
import config from "../../../config";
import DeviceUtils from "../../../utils/device-utils";
import { useAppData } from "../../common/providers/app-data-provider";
import PageLayout from "../../common/views/layout/page.layout";
import User from "../../user/models/User";
import { useLogin } from "../hooks/auth-hooks";
import LinkComponent from "../../../components/utility/link.component";
import Route from "../../../utils/routing/route";
import NumberUtils from "../../../utils/number-utils";


export default function SignInPage() {
    const { t } = useTranslation();
    const { toastError, onLogin } = useAppData();
    const { push } = useRouter();
    const { mutate: login, isLoading } = useLogin();
    const [body, setBody] = useState<Body>({
        phone: "",
        password: ""
    })

    interface Body {
        phone: string;
        password: string;
    }

    const onSubmit = () => {
        login({
            version: config.version,
            password: body.password.trim(),
            deviceType: DeviceUtils.deviceName(),
            os: DeviceUtils.deviceVersion(),
            phone: body.phone.trim(),
            platform: "DESKTOP"
        }, {
            onSuccess: async (user: User) => {
                onLogin(user);
                push("/");
            },
            onError: error => {
                toastError(error);
            }
        });
    }

    return (
        <PageLayout title={t("page.sign-in.title")}>
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
                            {t("page.sign-in.title")}
                        </Heading>
                        <Text textAlign={"center"}>
                            {t("page.sign-in.description")}
                        </Text>
                    </VStack>

                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Box>
                            <Form.Item
                                label={t("form.sign-in.phone-number")}
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
                                label={t("form.sign-in.password")}
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
                                        password: e.target.value
                                    })}
                                    placeholder={t("form.sign-in.password")}
                                />
                                <HStack pt={"0.25rem"}>
                                    <Spacer/>
                                    <Text textColor={"label.secondary"}>
                                        <LinkComponent href={Route.resetPassword()}>
                                            {t("page.sign-in.reset-password")}
                                        </LinkComponent>
                                    </Text>
                                </HStack>
                            </Form.Item>


                            <ButtonComponent
                                name={"press_btn_login"}
                                type={"submit"}
                                size={"lg"}
                                isLoading={isLoading}
                                block={true}
                                blockText={true}
                                title={t("form.sign-in.sign-in")}
                                logParams={{
                                    "emailStr": `${body.phone}`
                                }}
                                onClick={onSubmit}
                            />

                        </Box>
                    </Form>

                    <VStack mt={"1.75rem"}>
                        <Box>
                            <Text as={"span"} fontSize={"sm"} fontWeight={"medium"} textColor={"label.secondary"}>
                                {t("page.sign-in.dont-have-account")}
                            </Text>
                            {" "}
                            <LinkComponent href={Route.signUp()} fontSize={"sm"} fontWeight={"medium"}>
                                {t("page.sign-in.create-account")}
                            </LinkComponent>
                        </Box>
                    </VStack>
                </Container>
            </Center>
        </PageLayout>
    )
}