import { Box, Spinner } from "@chakra-ui/react";

interface DefaultLoaderProps {
    isLoading: boolean;
}

export default function DefaultLoader(props: DefaultLoaderProps) {
    const { isLoading } = props;

    return isLoading ? (
        <Box textAlign={"center"} py={"1rem"}>
            <Spinner
                thickness="0.25rem"
                speed="0.65s"
                emptyColor="background.secondary"
                color={"brand.base"}
                size="xl"
            />
        </Box>
    ) : <></>;
}