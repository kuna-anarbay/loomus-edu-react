import { Box, HStack, Spacer, StackDivider, Text, VStack } from "@chakra-ui/react";
import ButtonComponent from "../../../../components/button/button.component";
import React from "react";
import { useTranslation } from "react-i18next";
import CourseSubscription from "../../models/CourseSubscription";
import getFileSize from "../../../../utils/get-file-size";
import DateUtils from "../../../../utils/date-utils";
import { IoRocket } from "react-icons/io5";

interface CourseSubscriptionViewProps {
    subscription: CourseSubscription;
}

export default function CourseSubscriptionView(props: CourseSubscriptionViewProps) {
    const { subscription } = props;
    const { t } = useTranslation();

    return (
        <Box>
            <VStack fontSize={"md"} align={"stretch"} spacing={"1rem"}>
                <HStack>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>
                        {t("component.subscription.title")}
                    </Text>
                    <Spacer/>
                    <ButtonComponent
                        name={`press_btn_extend_subscription`}
                        icon={IoRocket}
                        size={"xs"}
                        title={t("component.subscription.upgrade")}
                        colorScheme={"success"}
                    />
                </HStack>

                <VStack
                    spacing={"0rem"} align={"stretch"}
                    divider={<StackDivider/>}
                    borderWidth={"1px"}
                    borderColor={"divider.secondary"}
                    rounded={"0.5rem"}
                    bgColor={"background.base"}
                >
                    <HStack py={"0.5rem"} px={"1rem"}>
                        <Text fontSize={"md"} fontWeight={"medium"}>
                            {t("component.subscription.expires-at")}
                        </Text>
                        <Spacer/>
                        <Text fontSize={"sm"} textColor={"label.secondary"}>
                            {DateUtils.format(subscription.expiresAt, "DD.MM.YYYY")}
                        </Text>
                    </HStack>
                    <HStack py={"0.5rem"} px={"1rem"}>
                        <Text fontSize={"md"} fontWeight={"medium"}>
                            {t("component.subscription.students-count")}
                        </Text>
                        <Spacer/>
                        <Text fontSize={"sm"} textColor={"label.secondary"}>
                            {subscription.studentsCount} / {subscription.maxStudentsCount}
                        </Text>
                    </HStack>
                    <HStack py={"0.5rem"} px={"1rem"}>
                        <Text fontSize={"md"} fontWeight={"medium"}>
                            {t("component.subscription.videos-count")}
                        </Text>
                        <Spacer/>
                        <Text fontSize={"sm"} textColor={"label.secondary"}>
                            {subscription.videosCount} / {subscription.maxVideosCount}
                        </Text>
                    </HStack>
                    <HStack py={"0.5rem"} px={"1rem"}>
                        <Text fontSize={"md"} fontWeight={"medium"}>
                            {t("component.subscription.resource-size")}
                        </Text>
                        <Spacer/>
                        <Text fontSize={"sm"} textColor={"label.secondary"}>
                            {getFileSize(subscription.resourceSize)} / {getFileSize(subscription.maxResourceSize)}
                        </Text>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    )
}