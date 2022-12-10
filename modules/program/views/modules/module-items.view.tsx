import { StackDivider, VStack } from "@chakra-ui/react";
import React from "react";
import ModuleItemView from "./module-item.view";
import Module from "../../models/Module";

interface ModuleItemsViewProps {
    modules: Module[];
}

export default function ModuleItemsView(props: ModuleItemsViewProps) {
    const { modules } = props;

    return (
        <VStack align="stretch" spacing={"0.5rem"}>
            <VStack align="stretch" spacing={"0rem"} divider={<StackDivider borderColor={"divider.base"}/>}>
                {modules.map((module) => (
                    <ModuleItemView module={module}/>
                ))}
            </VStack>
        </VStack>
    )
}