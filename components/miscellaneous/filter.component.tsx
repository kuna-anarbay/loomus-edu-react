import { Center, Text } from "@chakra-ui/react";
import { Dropdown, Menu } from "antd";
import { IoFilter } from "react-icons/io5";
import { useTranslation } from "react-i18next";

interface FilterComponentProps {
    currentId: number | null | undefined;
    items: {
        id: number;
        label: string;
    }[]
    onFilter: (currentId: number | null) => void;
}

export default function FilterComponent(props: FilterComponentProps) {
    const { currentId, items, onFilter } = props;
    const {t} = useTranslation();

    return (
        <Center
            cursor={"pointer"}
        >
            <Dropdown overlay={(
                <Menu>
                    <Menu.Item
                        onClick={() => {
                            onFilter(null);
                        }}
                    >
                        {t("component.filter.none-selected")}
                    </Menu.Item>
                    {items.map(item => (
                        <Menu.Item key={`${item.id}`}
                                   onClick={() => {
                                       onFilter(item.id);
                                   }}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}

                </Menu>
            )} trigger={["click"]}>
                <a onClick={e => e.preventDefault()}>
                    <Text fontSize={"13px"}
                          textColor={items.find(i => i.id === currentId) ? "brand.base" : "label.secondary"}>
                        <IoFilter/>
                    </Text>
                </a>
            </Dropdown>
        </Center>
    )
}