import { Box, Container, Flex, HStack, Image, Spacer, Text, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoChevronDown } from "react-icons/io5";
import avatarPath from "../../../../utils/file/avatar-path";
import withAlpha from "../../../../utils/with-alpha";
import { useAppData } from "../../providers/app-data-provider";
import StringUtils from "../../../../utils/string-utils";
import Route from "../../../../utils/routing/route";
import { Dropdown, Menu } from "antd";
import ButtonComponent from "../../../../components/button/button.component";
import LinkComponent from "../../../../components/utility/link.component";
import NumberUtils from "../../../../utils/number-utils";


export default function HeaderBar() {
    const { currentUser, logout } = useAppData();
    const { t } = useTranslation();
    const { push } = useRouter();
    const [isMediumWidth] = useMediaQuery("(min-width: 768px)");
    const [offsetTop, setOffsetTop] = useState(0);

    useEffect(() => {
        const scrollHandler = () => {
            setOffsetTop(window.scrollY)
        };
        window.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener("scroll", scrollHandler);
    }, [offsetTop]);

    const authorized = () => {
        const items = [
            {
                key: "press_btn_logout_from_header",
                label: t("component.header-bar.log-out"),
                danger: true,
                onClick: () => logout()
            }
        ]

        return (
            <Dropdown
                trigger={["click"]}
                overlay={<Menu items={items}/>}
            >
                <HStack cursor={"pointer"} spacing={"0.75rem"} minW={{ md: "12rem" }}>
                    <Image height={"2rem"} width={"2rem"} rounded={"full"} objectFit={"cover"}
                           src={avatarPath(currentUser?.avatarUrl)}/>
                    {isMediumWidth && (
                        <Box>
                            <Text textColor={"label.base"} fontSize={"15px"}>
                                {currentUser && StringUtils.fullName(currentUser)}
                            </Text>
                            <Text textColor={"label.secondary"} fontSize={"xs"}>
                                {NumberUtils.maskedPhone(currentUser?.phone)}
                            </Text>
                        </Box>
                    )}
                    <Text textColor={"label.secondary"}>
                        <IoChevronDown/>
                    </Text>
                </HStack>
            </Dropdown>
        )
    }

    return (
        <Box>
            <Box
                bgColor={withAlpha("#FFFFFF", Math.min(offsetTop, 64) / 64)} shadow={2}
                zIndex={500}
                position={"fixed"}
                top={"0"}
                width={"full"}
            >
                <Box
                    borderBottomWidth={"0.5px"}
                    borderColor={offsetTop > 64 ? "divider.secondary" : "transparent"}
                >
                    <Container
                        maxWidth={"container.xl"} px={"1rem"}
                    >
                        <Flex h={"4rem"} align={"center"}>
                            <Box mr="1.5rem">
                                <LinkComponent href={"/"}>
                                    <Image
                                        h={"1.5rem"}
                                        src={"/loomus.png"}
                                        alt={"loomus"}
                                        display={{ base: "none", md: "block" }}
                                    />
                                    <Image
                                        alt={"loomus"}
                                        h={"2.5rem"}
                                        w={"2.5rem"}
                                        minW={"2.5rem"}
                                        maxW={"2.5rem"}
                                        rounded={"0.5rem"}
                                        src={"/loomus-short.png"}
                                        display={{ base: "block", md: "none" }}
                                    />
                                </LinkComponent>
                            </Box>

                            <Spacer/>

                            {currentUser ? authorized() : (
                                <HStack>
                                    {isMediumWidth && (
                                        <LinkComponent href={Route.signUp()}>
                                            <ButtonComponent
                                                name={"press_btn_sign_up_from_header"}
                                                title={t("component.header-bar.sign-up")}
                                                size={"sm"}
                                                variant={"outline"}
                                            />
                                        </LinkComponent>
                                    )}
                                    <LinkComponent href={Route.signIn()}>
                                        <ButtonComponent
                                            name={"press_btn_sign_up_from_header"}
                                            title={t("component.header-bar.sign-in")}
                                            size={"sm"}
                                        />
                                    </LinkComponent>
                                </HStack>
                            )}
                        </Flex>
                    </Container>
                </Box>
            </Box>
            <Box h={"4rem"}/>
        </Box>
    )
}