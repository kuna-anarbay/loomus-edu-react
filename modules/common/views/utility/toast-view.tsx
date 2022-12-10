import { HStack, Spacer, Text } from "@chakra-ui/react";
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle } from "react-icons/io5";

interface ToastViewProps {
    message: string;
    bgColor: string;
    isError: boolean;
    onClose: () => void;
}

export default function ToastView(props: ToastViewProps) {
    const { message, onClose, bgColor, isError } = props;

    return (
        <HStack rounded={"0.5rem"} p={"1rem"} bgColor={bgColor} textColor={"white"}>
            <HStack>
                <Text fontSize={"1.25rem"}>
                    {isError ? <IoInformationCircle/> : <IoCheckmarkCircle/>}
                </Text>
                <Text fontSize={"1rem"} noOfLines={4}>
                    {message}
                </Text>
            </HStack>
            <Spacer/>
            <Text cursor={"pointer"} onClick={onClose} fontSize={"1.25rem"}>
                <IoCloseCircle/>
            </Text>
        </HStack>
    )
}