import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import ButtonComponent from "../components/button/button.component";
import { useTranslation } from "react-i18next";
import LinkComponent from "../components/utility/link.component";
import PageLayout from "../modules/common/views/layout/page.layout";


export default function Page() {
    const { t } = useTranslation();

    return (
        <PageLayout title={t("page.404.title")}>
            <Container maxW={"1080px"} px={"1rem"} my={"2rem"}>
                <Box textAlign={"center"} py={10} px={6}
                     rounded={{ base: "0.75rem", md: "1rem" }}
                     bgColor={"background.secondary"}
                     shadow={"sm"}
                >
                    <Heading as="h1" size="2xl" color="label.base">
                        404
                    </Heading>
                    <Text textColor={"label.base"} fontWeight={"medium"} fontSize="18px" mt={3} mb={1}>
                        {t("page.404.title")}
                    </Text>
                    <Text textColor={"label.secondary"} mb={8}>
                        {t("page.404.description")}
                    </Text>

                    <LinkComponent href={"/"}>
                        <ButtonComponent
                            name={"press_btn_open_home_from_404"}
                            blockText={true}
                            title={t("page.404.home")}
                        />
                    </LinkComponent>
                </Box>
            </Container>
        </PageLayout>
    );
}