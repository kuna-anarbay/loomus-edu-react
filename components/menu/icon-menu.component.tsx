import { IconType } from "react-icons";
import { Button, Dropdown, Menu, Modal } from "antd";
import { Box, Icon } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import useAnalytics from "../../modules/common/hooks/use-analytics.hook";

const { confirm } = Modal;

export interface IconMenuComponentItem {
    name: string;
    title: string;
    onClick: () => void;
    icon?: ReactNode;
    danger?: boolean;
    textColor?: string;
    logParams?: { [key: string]: string }
}

interface IconMenuComponentProps {
    icon: IconType;
    items: IconMenuComponentItem[];
    size?: "sm" | "md";
}

export default function IconMenuComponent(props: IconMenuComponentProps) {
    const { icon, items } = props;
    const { logEvent } = useAnalytics();
    const { t } = useTranslation();
    const size = props.size ?? "md";

    const showConfirm = (item: IconMenuComponentItem) => {
        confirm({
            title: t("component.confirm-delete.title"),
            okText: t("component.confirm-delete.confirm"),
            okType: "danger",
            cancelText: t("component.confirm-delete.cancel"),
            onOk() {
                logEvent({ name: item.name });
                item.onClick();
            },
            onCancel() {
            }
        })
    }

    return (
        <Box>
            <Dropdown
                trigger={["hover", "click"]}
                overlay={
                    <Menu
                        items={items.map((item) => {
                            return {
                                ...item,
                                key: item.name,
                                label: item.title,
                                onClick: () => {
                                    if (item.danger === true) {
                                        showConfirm(item);
                                    } else {
                                        logEvent({ name: item.name });
                                        item.onClick();
                                    }
                                }
                            }
                        })}
                    />
                }
            >
                <Button className={size === "sm" ? "btn-small-icon" : "btn-icon"}>
                    <Icon as={icon}/>
                </Button>
            </Dropdown>
        </Box>
    )
}