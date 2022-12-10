import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
    HStack,
    Spacer,
    Text,
    VStack
} from "@chakra-ui/react";
import { ReactNode } from "react";
import LinkComponent from "../utility/link.component";

interface PageHeaderComponentProps {
    title: string;
    items: {
        value: string;
        link?: string;
    }[];
    buttons?: ReactNode[];
}

export default function PageHeaderComponent(props: PageHeaderComponentProps) {
    const { title, items, buttons } = props;

    return (
        <Box mt="1.25rem" mb="1rem">
            <HStack>
                <VStack spacing="0.25rem" align="stretch">
                    <Breadcrumb fontSize={"sm"} spacing="8px" separator={
                        <Text
                            fontSize={"sm"}
                            fontWeight={"medium"}
                            textColor={"label.secondary"}
                        >/</Text>
                    }>
                        {items.map(item => (
                            <BreadcrumbItem key={`link-${item.link}`}>
                                <BreadcrumbLink
                                    as={"a"}
                                    fontSize={"md"}
                                    fontWeight={"medium"}
                                    textColor={"brand.base"}
                                >
                                    <LinkComponent href={item.link ?? "#"}>
                                        {item.value}
                                    </LinkComponent>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        ))}
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                fontSize={"md"}
                                fontWeight={"medium"}
                                textColor={"label.secondary"}
                                _hover={{
                                    textColor: "label.secondary"
                                }}
                            >
                                {title}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Heading fontSize={{ base: "1.5rem", md: "2rem" }} fontWeight="semibold">
                        {title}
                    </Heading>
                </VStack>
                <Spacer/>
                {buttons && (
                    buttons.map(button => button)
                )}
            </HStack>
        </Box>
    )
}
