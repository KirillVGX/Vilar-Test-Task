import { ReloadOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Empty, Flex, Segmented, Space, Spin, Typography, theme } from "antd";
import { useState } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useCoinChart } from "../hooks/useCoinChart.js";

const { Title, Text } = Typography;

const COIN_OPTIONS = [
    { label: "Bitcoin", value: "bitcoin" },
    { label: "Ethereum", value: "ethereum" },
    { label: "Dogecoin", value: "dogecoin" },
];

const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

function formatUsd(value) {
    if (!Number.isFinite(value)) {
        return "-";
    }

    return usdFormatter.format(value);
}

function formatAxisUsd(value) {
    if (!Number.isFinite(value)) {
        return "";
    }

    return usdFormatter.format(value);
}

function ChartContent({ data, loading, colorPrimary, colorBorderSecondary }) {
    if (loading) {
        return (
            <Flex align="center" justify="center" style={{ height: 360 }}>
                <Spin size="large" />
            </Flex>
        );
    }

    if (!data.length) {
        return (
            <Flex align="center" justify="center" style={{ height: 360, padding: 24 }}>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No chart data available"
                />
            </Flex>
        );
    }

    return (
        <div style={{ height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
                    <CartesianGrid stroke={colorBorderSecondary} strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="label"
                        minTickGap={32}
                        tickLine={false}
                        axisLine={{ stroke: colorBorderSecondary }}
                    />
                    <YAxis
                        width={88}
                        tickFormatter={formatAxisUsd}
                        tickLine={false}
                        axisLine={false}
                        domain={["dataMin", "dataMax"]}
                    />
                    <Tooltip formatter={(value) => [formatUsd(value), "Price"]} />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke={colorPrimary}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

function Chart() {
    const [coinId, setCoinId] = useState("bitcoin");
    const [isManualRefresh, setIsManualRefresh] = useState(false);
    const {
        token: { colorBorderSecondary, colorPrimary },
    } = theme.useToken();
    const {
        data = [],
        error,
        isError,
        isFetching,
        isLoading,
        isRefetchError,
        refetch,
    } = useCoinChart(coinId);
    const chartLoading = isLoading || isManualRefresh;
    const showBlockingError = isError && !data.length;
    const showRefreshWarning = isRefetchError && data.length > 0;

    async function handleRefresh() {
        setIsManualRefresh(true);

        try {
            await refetch();
        } finally {
            setIsManualRefresh(false);
        }
    }

    return (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Flex align="flex-start" justify="space-between" gap={16} wrap>
                <div>
                    <Title level={2}>7-Day Crypto Price Chart</Title>
                    <Text type="secondary">Price history with background auto-refresh.</Text>
                </div>

                <Flex gap={12} wrap>
                    <Segmented options={COIN_OPTIONS} value={coinId} onChange={setCoinId} />
                    <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        loading={isManualRefresh}
                        onClick={handleRefresh}
                    >
                        Оновити
                    </Button>
                </Flex>
            </Flex>

            {showBlockingError ? (
                <Alert
                    type="warning"
                    showIcon
                    message="Unable to load chart data"
                    description={error.message}
                />
            ) : null}

            <Card>
                <Flex align="center" justify="space-between" gap={16} wrap>
                    <Text strong>{COIN_OPTIONS.find((coin) => coin.value === coinId)?.label} price</Text>
                    {isFetching && !chartLoading ? <Text type="secondary">Refreshing...</Text> : null}
                </Flex>

                {showRefreshWarning ? (
                    <Alert
                        type="warning"
                        showIcon
                        message={error.message}
                        style={{ marginTop: 12 }}
                    />
                ) : null}

                <ChartContent
                    data={data}
                    loading={chartLoading}
                    colorPrimary={colorPrimary}
                    colorBorderSecondary={colorBorderSecondary}
                />
            </Card>
        </Space>
    );
}

export default Chart;
