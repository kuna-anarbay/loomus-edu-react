import React, { ReactNode } from "react";
import { Box, Center, HStack, useMediaQuery, VStack } from "@chakra-ui/react";
import { Drawer } from "antd";
import { IoClose } from "react-icons/io5";
import DefaultSpinner from "../loader/default-spinner";

interface DrawerComponentProps {
    isOpen: boolean;
    onClose: () => void;
    size?: string;
    children: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    isLoading?: boolean;
}

export default function DrawerComponent(props: DrawerComponentProps) {
    const { isOpen, onClose, children, header, footer } = props;
    const [isMediumWidth] = useMediaQuery("(min-width: 768px)");
    const size = props.size ?? "32rem";
    const isLoading = props.isLoading ?? false;

    return (
        <Drawer
            footer={footer}
            visible={isOpen}
            onClose={onClose}
            width={isMediumWidth ? size : "100%"}
            closable={false}
        >
            <VStack spacing={"1rem"} align={"stretch"}>
                <HStack>
                    <Box fontSize={"1.25rem"} fontWeight={"semibold"} flexGrow={1}>
                        {header}
                    </Box>
                    {isLoading && <DefaultSpinner/>}
                    <Center
                        cursor={"pointer"}
                        fontSize={"xl"}
                        textColor={"label.secondary"}
                        onClick={onClose}
                        rounded={"6px"}
                        h={"30px"} w={"30px"}
                        _hover={{
                            textColor: "label.base",
                            bgColor: "highlight.gray.base"
                        }}
                    >
                        <IoClose/>
                    </Center>
                </HStack>
                {children}
            </VStack>
        </Drawer>
    )
}