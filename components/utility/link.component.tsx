import { ReactNode } from "react";
import Link from "next/link";
import { Text, TextProps } from "@chakra-ui/react";

interface LinkComponentProps extends TextProps {
    href: string;
    children: string | ReactNode;
}

export default function LinkComponent(props: LinkComponentProps) {
    const { href, children, ...textProps } = props;

    if (href === "#") {
        return (
            <Text
                as={"a"}
                cursor={"pointer"}
                _hover={{
                    textColor: "brand.base"
                }}
                {...textProps}
            >
                {children}
            </Text>
        );
    } else {
        return (
            <Link href={href} passHref={true}>
                <Text
                    as={"a"}
                    cursor={"pointer"}
                    _hover={{
                        textColor: "brand.base"
                    }}
                    {...textProps}
                >
                    {children}
                </Text>
            </Link>
        );
    }
}