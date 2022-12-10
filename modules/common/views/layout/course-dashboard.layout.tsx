import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Center,
    Container,
    Heading,
    HStack,
    Image,
    Spacer,
    Text,
    Tooltip,
    useMediaQuery,
    VStack
} from "@chakra-ui/react";
import React, { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppData } from "../../providers/app-data-provider";
import avatarPath from "../../../../utils/file/avatar-path";
import { useCourseData } from "../../../course/provider/course.provider";
import DefaultLoader from "../../../../components/loader/default-loader";
import StringUtils from "../../../../utils/string-utils";
import PageHead from "./page.head";
import LinkComponent from "../../../../components/utility/link.component";
import { Dropdown, Menu } from "antd";
import Course from "../../../course/models/Course";
import Route from "../../../../utils/routing/route";
import { IoChevronBack, IoChevronDown } from "react-icons/io5";
import NumberUtils from "../../../../utils/number-utils";

interface CourseDashboardLayoutProps {
    title: string;
    course: Course;
    isLoading?: boolean;
    subtitle?: ReactNode;
    items?: {
        value: string;
        link?: string;
    }[];
    children: ReactNode;
    buttons?: ReactNode[];
    isContainer?: boolean;
    backUrl?: string;
    px?: string;
    py?: string;
    bgColor?: string;
    containerColor?: string;
    hideHeader?: boolean;
}

export default function CourseDashboardLayout(props: CourseDashboardLayoutProps) {
    const { children, items, title, buttons, subtitle, course, bgColor, px, py, backUrl } = props;
    const { currentUser, logout } = useAppData();
    const { configure, isLoaded, isStaff } = useCourseData();
    const { t } = useTranslation();
    const [isMediumWidth] = useMediaQuery("(min-width: 768px)");
    const isLoading = props.isLoading ?? false;
    const hideHeader = props.hideHeader ?? false;
    const isContainer = props.isContainer ?? false;
    const containerColor = props.containerColor ?? "transparent";

    useEffect(() => {
        configure(course);
    }, []);

    // useEffect(() => {
    //     document.addEventListener("contextmenu", (e) => {
    //         e.preventDefault();
    //     });
    // }, []);

    const ProfileDropdown = () => {
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
                    <Image height={"2rem"} width={"2rem"} rounded={"full"}
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
        );
    };

    return (
        <Box userSelect={isStaff ? "auto" : "none"} bgColor={bgColor ?? "background.secondary"}>

            <PageHead title={title}/>

            {!isLoaded ? (
                <Center bgColor={"background.base"} h={"100vh"} w={"100vw"}>
                    <VStack spacing={"1rem"}>
                        <Image alt={"loomus"} cursor={"pointer"} h={"2.5rem"} src={"/loomus.png"}/>
                        <DefaultLoader isLoading={true}/>
                    </VStack>
                </Center>
            ) : (
                <Box position={"relative"} minH={"100vh"}>
                    <Box
                        position={"sticky"}
                        top={"0px"}
                        left={"0px"}
                        right={"0px"}
                        width={"100%"}
                        height={"4rem"}
                        bgColor={"background.base"}
                        borderBottomWidth={"1px"}
                        borderColor={"divider.secondary"}
                        zIndex={999}
                    >
                        <Container maxW={"container.xl"} px={{ base: "1rem", md: "1rem" }}>
                            <HStack
                                width={"100%"}
                                height={"4rem"}
                                spacing={{ base: "0.75rem", md: "1.25rem" }}
                                align={"center"}
                            >

                                <LinkComponent href={"/"}>
                                    <HStack h={"4rem"}>
                                        {isMediumWidth ? (
                                            <Image
                                                h={"1.5rem"}
                                                src={"/loomus.png"}
                                            />
                                        ) : (
                                            <Image
                                                h={"2.5rem"}
                                                w={"2.5rem"}
                                                minW={"2.5rem"}
                                                maxW={"2.5rem"}
                                                rounded={"0.5rem"}
                                                src={"/loomus-short.png"}
                                            />
                                        )}
                                    </HStack>
                                </LinkComponent>

                                <Box
                                    h={"4rem"}
                                    w={"1px"}
                                    bgColor={"divider.secondary"}
                                />

                                {isMediumWidth ? (
                                    <Box>

                                        <LinkComponent href={Route.courses.id(course.username)}>
                                            <Text fontSize={"md"} noOfLines={1} fontWeight={"medium"}>
                                                {course.name}
                                            </Text>
                                        </LinkComponent>
                                        <Breadcrumb
                                            fontSize={"sm"}
                                            spacing="0.375rem"
                                            separator={
                                                <Text textColor={"label.secondary"}>/</Text>
                                            }
                                        >
                                            {(items ?? []).map(item => (
                                                <BreadcrumbItem
                                                    key={`link-${item.link}`}
                                                    textColor={"label.secondary"}
                                                    _hover={{
                                                        textColor: "brand.base"
                                                    }}
                                                >
                                                    <Tooltip label={item.value}>
                                                        <BreadcrumbLink>
                                                            <LinkComponent href={item.link ?? "#"}>
                                                                {item.value.length > 20 ? `${item.value.substring(0, 20)}...` : item.value}
                                                            </LinkComponent>
                                                        </BreadcrumbLink>
                                                    </Tooltip>
                                                </BreadcrumbItem>
                                            ))}
                                            <BreadcrumbItem textColor={"label.base"}>
                                                <Tooltip label={title}>
                                                    {title.length > 20 ? `${title.substring(0, 20)}...` : title}
                                                </Tooltip>
                                            </BreadcrumbItem>
                                        </Breadcrumb>
                                    </Box>
                                ) : (
                                    <HStack>
                                        {backUrl && (
                                            <LinkComponent href={backUrl}>
                                                <Center h={"1.5rem"} w={"1.5rem"} bgColor={"background.secondary"}
                                                        rounded={"full"}>
                                                    <IoChevronBack/>
                                                </Center>
                                            </LinkComponent>
                                        )}
                                        <Text
                                            fontSize={"sm"}
                                            fontWeight={"normal"}
                                            noOfLines={2}
                                        >
                                            {title}
                                        </Text>
                                    </HStack>
                                )}

                                <Spacer/>

                                <ProfileDropdown/>


                            </HStack>
                        </Container>
                    </Box>

                    <Container
                        maxW={isContainer ? "1080px" : "100vw"}
                        py={py ?? "1rem"}
                        px={px ?? { base: "1rem", md: "1.75rem" }}
                        bgColor={containerColor}
                        minH={"calc(100vh - 4rem)"}
                    >
                        {!hideHeader && (
                            <HStack
                                pt={"0.75rem"}
                                pb={"1rem"}
                                align={"stretch"}
                            >
                                <Box>
                                    <Heading
                                        fontSize={{ base: "1.5rem", md: "1.875rem" }}
                                        lineHeight={{ base: "1.75rem", md: "2.25rem" }}
                                        textColor={"label.base"}
                                    >
                                        {title}
                                    </Heading>
                                    {subtitle && (
                                        <Text fontSize={"sm"} textColor={"label.base"}>
                                            {subtitle}
                                        </Text>
                                    )}
                                </Box>
                                <Spacer/>
                                {buttons && (
                                    buttons.map(button => (
                                        <Box>
                                            {button}
                                        </Box>
                                    ))
                                )}
                            </HStack>
                        )}

                        {isLoading && <DefaultLoader isLoading={true}/>}
                        {course ? children : <></>}
                    </Container>
                </Box>
            )}

        </Box>
    )
}