import { Center, Image, Text } from "@chakra-ui/react";

interface SortComponentProps {
    name: string;
    orderBy: string;
    orderDirection: string;
    onSort: (orderBy: string, orderDirection: string) => void;
}

export default function SortComponent(props: SortComponentProps) {
    const { name, orderDirection, orderBy, onSort } = props;

    const onClick = () => {
        if (name === orderBy) {
            if (orderDirection === "asc") {
                onSort(name, "desc")
            } else {
                onSort("id", "asc")
            }
        } else {
            onSort(name, "asc")
        }
    }

    return (
        <Center
            cursor={"pointer"}
            onClick={onClick}
        >
            {name !== orderBy && (
                <Text textColor={"label.secondary"}>
                    <Image
                        alt={"sort-icon"}
                        width={"13px"}
                        height={"13px"}
                        src={"/sort/sort.svg"}
                    />
                </Text>
            )}
            {name === orderBy && orderDirection === "asc" && (
                <Text textColor={"brand.base"}>
                    <Image
                        alt={"sort-asc-icon"}
                        width={"13px"}
                        height={"13px"}
                        src={"/sort/sort-asc.svg"}
                    />
                </Text>
            )}
            {name === orderBy && orderDirection === "desc" && (
                <Text textColor={"brand.base"}>
                    <Image
                        alt={"sort-desc-icon"}
                        width={"13px"}
                        height={"13px"}
                        src={"/sort/sort-desc.svg"}
                    />
                </Text>
            )}
        </Center>
    )
}