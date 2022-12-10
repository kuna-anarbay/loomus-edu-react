import { Box, Text, useDisclosure, VStack } from "@chakra-ui/react";
import StringUtils from "../../../../utils/string-utils";
import React from "react";
import Student from "../../models/Student";
import StudentDrawer from "./student.drawer";
import NumberUtils from "../../../../utils/number-utils";

interface StudentViewProps {
    student: Student;
    as?: "normal" | "span" | "header";
    onEditStudent?: (res: Student) => void;
}

export default function StudentView(props: StudentViewProps) {
    const { student, onEditStudent } = props;
    const { isOpen, onClose, onOpen } = useDisclosure();
    const as = props.as ?? "normal";

    return (
        <Box as={as === "span" ? "span" : undefined}>
            <VStack
                cursor={"pointer"}
                align={"stretch"} spacing={"0rem"}
                onClick={onOpen}
                _hover={{
                    textColor: "brand.base"
                }}
            >
                <Text
                    fontSize={"15px"} fontWeight={"medium"}
                    textDecoration={"underline"}
                    textUnderlineOffset={"2px"}
                    textDecorationColor={"divider.base"}
                    _hover={{
                        textDecorationColor: "brand.base"
                    }}
                >
                    {StringUtils.fullName(student)}
                </Text>
                <Text fontSize={"xs"} textColor={"label.secondary"}>
                    {NumberUtils.maskedPhone(student.phone)}
                </Text>
            </VStack>

            <StudentDrawer
                isOpen={isOpen}
                onClose={onClose}
                student={student}
                onEditStudent={res => {
                    if (onEditStudent) {
                        onEditStudent(res)
                    }
                }}
            />
        </Box>
    )
}