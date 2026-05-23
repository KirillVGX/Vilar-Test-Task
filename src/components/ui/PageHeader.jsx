import { Flex, Typography } from "antd";

const { Title, Text } = Typography;

function PageHeader({ title, description, actions }) {
    return (
        <Flex align="flex-start" justify="space-between" gap={16} wrap>
            <div>
                <Title level={2}>{title}</Title>
                {description ? <Text type="secondary">{description}</Text> : null}
            </div>
            {actions ? <Flex gap={12} wrap>{actions}</Flex> : null}
        </Flex>
    );
}

export default PageHeader;
