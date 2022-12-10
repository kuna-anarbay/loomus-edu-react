import Module from "../../models/Module";
import { Box, Center, Collapse, HStack, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React from "react";
import LessonItemView from "../lessons/lesson-item.view";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import StringUtils from "../../../../utils/string-utils";

interface ModuleItemViewProps {
    module: Module;
}

export default function ModuleItemView(props: ModuleItemViewProps) {
    const { module } = props;
    const { t } = useTranslation();
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <HStack
                py={"0.5rem"}
                cursor={"pointer"}
                onClick={onToggle}
                _hover={{
                    textColor: "brand.base"
                }}
            >
                <Box>
                    <Text fontWeight={"medium"} fontSize={"15px"}>
                        {t("component.module.index")} {module.index}. {module.name}
                    </Text>
                    <Text fontSize={"xs"} textColor={"label.secondary"}>
                        {module.lessons.length} {t(StringUtils.lessonsCount(module.lessons.length))}
                    </Text>
                </Box>
                <Spacer/>
                <Center
                    fontSize={"md"}
                    h={"1.25rem"} w={"1.25rem"}
                >
                    {isOpen ? <IoChevronUp/> : <IoChevronDown/>}
                </Center>
            </HStack>

            <Collapse in={isOpen}>
                <VStack align={"stretch"}>
                    {module.lessons.map((lesson) => (
                        <LessonItemView lesson={lesson}/>
                    ))}
                </VStack>
            </Collapse>
        </Box>
    )
}