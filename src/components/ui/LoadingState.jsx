import { Flex, Spin } from "antd";

function LoadingState({ height = 320 }) {
    return (
        <Flex align="center" justify="center" style={{ minHeight: height }}>
            <Spin size="large" />
        </Flex>
    );
}

export default LoadingState;
