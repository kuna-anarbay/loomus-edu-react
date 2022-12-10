import { Center, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import React from "react";
import useAnalytics from "../../modules/common/hooks/use-analytics.hook";
import withAlpha from "../../utils/with-alpha";

interface IconButtonComponentProps {
    name: string;
    icon: IconType;
    isActive?: boolean;
    fontSize?: string;
    size?: string;
    onClick?: () => void;
    colorScheme?: "brand" | "gray" | "success" | "danger" | "warning";
    logParams?: {
        [key: string]: string;
    }
}

export default function IconButtonComponent(props: IconButtonComponentProps) {
    const { icon, onClick, name, logParams } = props;
    const { logEvent } = useAnalytics();
    const isActive = props.isActive ?? false;
    const size = props.size ?? "2rem";
    const fontSize = props.fontSize ?? "1.25rem";
    const colorScheme = props.colorScheme ?? "brand";

    const style = () => {
        if (isActive) {
            return activeStyle();
        }
        switch (colorScheme) {
            case "brand":
                return {
                    bgColor: withAlpha("#006778", 0.1),
                    textColor: "brand.base"
                }
            case "danger":
                return {
                    bgColor: "background.secondary",
                    textColor: "highlight.red.base"
                }
            case "gray":
                return {
                    bgColor: "background.secondary",
                    textColor: "highlight.gray.base"
                }
            case "success":
                return {
                    bgColor: "background.secondary",
                    textColor: "highlight.green.base"
                }
            case "warning":
                return {
                    bgColor: "background.secondary",
                    textColor: "highlight.orange.base"
                }
        }
    }


    const activeStyle = () => {
        switch (colorScheme) {
            case "brand":
                return {
                    bgColor: "brand.base",
                    textColor: "white"
                }
            case "danger":
                return {
                    bgColor: "highlight.red.base",
                    textColor: "white"
                }
            case "gray":
                return {
                    bgColor: "highlight.gray.base",
                    textColor: "white"
                }
            case "success":
                return {
                    bgColor: "highlight.green.base",
                    textColor: "white"
                }
            case "warning":
                return {
                    bgColor: "highlight.orange.base",
                    textColor: "white"
                }
        }
    }

    return (
        <Center
            onClick={() => {
                logEvent({
                    name: name,
                    params: logParams
                })
                if (onClick) {
                    onClick();
                }
            }}
            cursor={"pointer"}
            w={size}
            h={size}
            rounded={"0.375rem"}
            textColor={"label.secondary"}
            fontSize={fontSize}
            _hover={style()}
            {...isActive ? { ...activeStyle() } : { ...{} }}
        >
            <Icon as={icon}/>
        </Center>
    )
}