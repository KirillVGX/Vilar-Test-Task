import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Segmented, Space, Typography, theme } from "antd";
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
import EmptyState from "../components/ui/EmptyState.jsx";
import ErrorState from "../components/ui/ErrorState.jsx";
import LoadingState from "../components/ui/LoadingState.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import { useCoinChart } from "../hooks/useCoinChart.js";
import { formatCurrency } from "../utils/formatters.js";

const { Text } = Typography;

const COIN_OPTIONS = [
    { label: "Bitcoin", value: "bitcoin" },
    { label: "Ethereum", value: "ethereum" },
    { label: "Dogecoin", value: "dogecoin" },
];

function formatAxisUsd(value) {
    return Number.isFinite(value) ? formatCurrency(value) : "";
}

function ChartContent({ data, loading, colorPrimary, colorBorderSecondary }) {
    if (loading) {
        return <LoadingState height={360} />;
    }

    if (!data.length) {
        return <EmptyState description="No chart data available" height={360} />;
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
                    <Tooltip formatter={(value) => [formatCurrency(value), "Price"]} />
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
        if (isManualRefresh || isFetching) {
            return;
        }

        setIsManualRefresh(true);

        try {
            await refetch();
        } finally {
            setIsManualRefresh(false);
        }
    }

    return (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <PageHeader
                title="7-Day Crypto Price Chart"
                description="Price history with background auto-refresh."
                actions={
                    <>
                        <Segmented options={COIN_OPTIONS} value={coinId} onChange={setCoinId} />
                        <Button
                            type="primary"
                            icon={<ReloadOutlined />}
                            loading={isManualRefresh}
                            disabled={isFetching}
                            onClick={handleRefresh}
                        >
                            {"\u041e\u043d\u043e\u0432\u0438\u0442\u0438"}
                        </Button>
                    </>
                }
            />

            {showBlockingError ? (
                <ErrorState
                    type="warning"
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
                    <ErrorState
                        type="warning"
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
