import { IconType } from "react-icons";
import { Button, Icon, useMediaQuery } from "@chakra-ui/react";
import useAnalytics from "../../modules/common/hooks/use-analytics.hook";
import * as React from "react";

interface ButtonComponentProps {
    name: string;
    title: string;
    onClick?: () => void;
    isDisabled?: boolean;
    isLoading?: boolean;
    block?: boolean;
    blockText?: boolean;
    icon?: IconType;
    iconPosition?: "left" | "right";
    variant?: "filled" | "outline";
    colorScheme?: "brand" | "gray" | "success" | "danger" | "warning";
    type?: "submit" | "button";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    logParams?: {
        [key: string]: string;
    }
}

type State = "default" | "hovered" | "active" | "focus" | "disabled";

export default function ButtonComponent(props: ButtonComponentProps) {
    const { name, title, icon, onClick, logParams } = props;
    const { logEvent } = useAnalytics();
    const [isMediumWidth] = useMediaQuery("(min-width: 768px)");
    const isLoading = props.isLoading ?? false;
    const isDisabled = props.isDisabled ?? false;
    const variant = props.variant ?? "filled";
    const type = props.type ?? "button";
    const size = props.size ?? "md";
    const block = props.block ?? false;
    const blockText = props.blockText ?? icon === undefined;
    const colorScheme = props.colorScheme ?? "brand";
    const iconPosition = props.iconPosition ?? "left";

    const params = () => {
        switch (size) {
            case "xs":
                return {
                    fontSize: "13px",
                    lineHeight: "16px",
                    fontWeight: "normal",
                    py: "6px",
                    px: "12px",
                    rounded: "5px",
                    height: "28px",
                    width: block ? "full" : undefined
                };
            case "sm":
                return {
                    fontSize: "14px",
                    fontWeight: "medium",
                    lineHeight: "20px",
                    py: "6px",
                    px: "15px",
                    rounded: "6px",
                    height: "32px",
                    width: block ? "full" : undefined
                };
            case "md":
                return {
                    fontSize: "15px",
                    fontWeight: "medium",
                    lineHeight: "22px",
                    py: "6px",
                    px: "20px",
                    rounded: "7px",
                    height: "34px",
                    width: block ? "full" : undefined
                };
            case "lg":
                return {
                    fontSize: "16px",
                    fontWeight: "semibold",
                    lineHeight: "24px",
                    py: "8px",
                    px: "28px",
                    rounded: "8px",
                    height: "40px",
                    width: block ? "full" : undefined
                };
            case "xl":
                return {
                    fontSize: "18px",
                    fontWeight: "semibold",
                    lineHeight: "26px",
                    py: "12px",
                    px: "40px",
                    rounded: "10px",
                    height: "50px",
                    width: block ? "full" : undefined
                };
        }
    }

    const styles = (state: State) => {
        if (variant === "outline") {
            switch (colorScheme) {
                case "brand":
                case "success":
                    if (state === "disabled") {
                        return {
                            textColor: "brand.base",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else if (state === "hovered") {
                        return {
                            textColor: "brand.base",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else if (state === "focus" || state === "active") {
                        return {
                            textColor: "brand.base",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else {
                        return {
                            textColor: "brand.base",
                            borderWidth: "1px",
                            borderColor: "divider.secondary",
                            bgColor: "background.base"
                        }
                    }
                case "gray":
                    if (state === "disabled") {
                        return {
                            textColor: "label.secondary",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else if (state === "hovered") {
                        return {
                            textColor: "brand.base",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else if (state === "focus" || state === "active") {
                        return {
                            textColor: "brand.base",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else {
                        return {
                            textColor: "label.base",
                            borderWidth: "1px",
                            borderColor: "divider.secondary",
                            bgColor: "background.base"
                        }
                    }
                case "warning":
                    if (state === "disabled") {
                        return {
                            textColor: "highlight.orange.dark",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else if (state === "hovered") {
                        return {
                            textColor: "highlight.orange.dark",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else if (state === "focus" || state === "active") {
                        return {
                            textColor: "highlight.orange.dark",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else {
                        return {
                            textColor: "highlight.orange.base",
                            borderWidth: "1px",
                            borderColor: "divider.secondary",
                            bgColor: "background.base"
                        }
                    }
                case "danger":
                    if (state === "disabled") {
                        return {
                            textColor: "highlight.red.dark",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else if (state === "hovered") {
                        return {
                            textColor: "highlight.red.dark",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else if (state === "focus" || state === "active") {
                        return {
                            textColor: "highlight.red.dark",
                            borderWidth: "1px",
                            borderColor: "divider.base",
                            bgColor: "background.base"
                        }
                    } else {
                        return {
                            textColor: "highlight.red.base",
                            borderWidth: "1px",
                            borderColor: "divider.secondary",
                            bgColor: "background.base"
                        }
                    }
            }
        } else if (variant === "filled") {
            switch (colorScheme) {
                case "gray":
                    if (state === "disabled") {
                        return {
                            textColor: "label.base",
                            borderWidth: "1px",
                            borderColor: "highlight.gray.dark",
                            bgColor: "highlight.gray.base"
                        }
                    } else if (state === "hovered") {
                        return {
                            textColor: "label.base",
                            borderWidth: "1px",
                            borderColor: "highlight.gray.dark",
                            bgColor: "highlight.gray.base"
                        }
                    } else if (state === "focus" || state === "active") {
                        return {
                            textColor: "label.base",
                            borderWidth: "1px",
                            borderColor: "highlight.gray.dark",
                            bgColor: "highlight.gray.base"
                        }
                    } else {
                        return {
                            textColor: "label.base",
                            borderWidth: "1px",
                            borderColor: "highlight.gray.dark",
                            bgColor: "highlight.gray.secondary"
                        }
                    }
                case "warning":
                    if (state === "disabled") {
                        return {
                            textColor: "white",
                            borderWidth: "1px",
                            borderColor: "highlight.orange.dark",
                            bgColor: "highlight.orange.dark"
                        }
                    } else if (state === "hovered") {
                        return {
                            textColor: "white",
                            borderWidth: "1px",
                            borderColor: "highlight.orange.dark",
                            bgColor: "highlight.orange.dark"
                        }
                    } else if (state === "focus" || state === "active") {
                        return {
                            textColor: "white",
                            borderWidth: "1px",
                            borderColor: "highlight.orange.dark",
                            bgColor: "highlight.orange.dark"
                        }
                    } else {
                        return {
                            textColor: "white",
                            borderWidth: "1px",
                            borderColor: "highlight.orange.dark",
                            bgColor: "highlight.orange.base"
                        }
                    }
                case "danger":
                    if (state === "disabled") {
                        return {
                            textColor: "white",
                            borderWidth: "1px",
                            borderColor: "highlight.red.dark",
                            bgColor: "highlight.red.dark"
                        }
                    } else if (state === "hovered") {
                        return {
                            textColor: "white",
                            borderWidth: "1px",
                            borderColor: "highlight.red.dark",
                            bgColor: "highlight.red.dark"
                        }
                    } else if (state === "focus" || state === "active") {
                        return {
                            textColor: "white",
                            borderWidth: "1px",
                            borderColor: "highlight.red.dark",
                            bgColor: "highlight.red.dark"
                        }
                    } else {
                        return {
                            textColor: "white",
                            borderWidth: "1px",
                            borderColor: "highlight.red.dark",
                            bgColor: "highlight.red.base"
                        }
                    }
                case "brand":
                case "success":
                    if (state === "disabled") {
                        return {
                            textColor: "white",
                            bgColor: "brand.dark",
                            borderWidth: "1px",
                            borderColor: "brand.dark"
                        }
                    } else if (state === "hovered") {
                        return {
                            textColor: "white",
                            bgColor: "brand.dark",
                            borderWidth: "1px",
                            borderColor: "brand.dark"
                        }
                    } else if (state === "focus" || state === "active") {
                        return {
                            textColor: "white",
                            bgColor: "brand.dark",
                            borderWidth: "1px",
                            borderColor: "brand.dark"
                        }
                    } else {
                        return {
                            textColor: "white",
                            bgColor: "brand.base",
                            borderWidth: "1px",
                            borderColor: "brand.dark"
                        }
                    }
            }
        }
    }

    return (
        <Button
            variant={"solid"}
            isLoading={isLoading}
            disabled={isDisabled || isLoading}
            leftIcon={(icon && iconPosition === "left" && (isMediumWidth || blockText)) ? <Icon as={icon}/> : undefined}
            rightIcon={(icon && iconPosition === "right" && (isMediumWidth || blockText)) ?
                <Icon as={icon}/> : undefined}
            onClick={() => {
                logEvent({
                    name: name,
                    params: logParams
                });
                if (onClick) {
                    onClick();
                }
            }}
            type={type}
            {...params()}
            {...styles("default")}
            _hover={{
                ...styles("hovered")
            }}
            _active={{
                ...styles("active")
            }}
            _focus={{
                ...styles("focus")
            }}
            _disabled={{
                ...styles("disabled")
            }}
        >
            {(blockText || isMediumWidth) ? title : <Icon as={icon}/>}
        </Button>
    );

};