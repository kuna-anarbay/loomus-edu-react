import { Box } from "@chakra-ui/react";
import PageHead from "./page.head";
import React, { ReactNode } from "react";
import HeaderBar from "./header.bar";

interface PageLayoutProps {
    title?: string;
    children: ReactNode;
}

export default function PageLayout(props: PageLayoutProps) {
    const { children, title } = props;

    return (
        <Box>
            <PageHead title={title}/>
            <Box>
                <HeaderBar/>
                <Box minHeight={"calc(100vh - 4rem)"}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}