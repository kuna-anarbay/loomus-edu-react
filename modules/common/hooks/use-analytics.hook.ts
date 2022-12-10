import { logEvent } from "@firebase/analytics";
import { analytics } from "../../../config/firebase";
import config from "../../../config";
import { useAppData } from "../providers/app-data-provider";
import { useRouter } from "next/router";

interface AnalyticsProps {
    name: string;
    params?: {
        [key: string]: string;
    }
}

const useAnalytics = () => {
    const { asPath } = useRouter();
    const { currentUser } = useAppData();
    const params: { [key: string]: string } = {};
    const courseId = asPath.split("/")[2];
    if (courseId) {
        params["courseIdStr"] = courseId
    }
    if (currentUser) {
        params["currentUserIdStr"] = `${currentUser.id}`
    }

    return {
        logEvent: (props: AnalyticsProps) => {
            const firAnalytics = analytics();
            if (config.nodeEnv === "prod" && firAnalytics) {
                logEvent(firAnalytics, props.name, {
                    ...params,
                    ...props.params
                });
            }
        }
    }
}

export default useAnalytics;