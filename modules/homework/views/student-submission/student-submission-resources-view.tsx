import { VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import HomeworkSubmissionResource from "../../models/HomeworkSubmissionResource";
import StudentSubmissionResourceView from "./student-submission-resource.view";

interface StudentSubmissionResourcesViewProps {
    resources: HomeworkSubmissionResource[];
}

export default function StudentSubmissionResourcesView(props: StudentSubmissionResourcesViewProps) {
    const { resources } = props;
    const { t } = useTranslation();

    return (
        <VStack align={"stretch"} spacing={"0.5rem"}>
            {resources.map(resource => (
                <StudentSubmissionResourceView
                    key={`resource-${resource.id}`}
                    resource={resource}/>
            ))}
        </VStack>
    )

}