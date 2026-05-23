import { Empty, Flex } from "antd";

function EmptyState({ description = "No data available", height = 320 }) {
    return (
        <Flex align="center" justify="center" style={{ minHeight: height, padding: 24 }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description} />
        </Flex>
    );
}

export default EmptyState;
