import { Avatar, Flex, Table, Typography } from "antd";
import EmptyState from "./ui/EmptyState.jsx";
import {
    formatCompactCurrency,
    formatCurrency,
    formatSignedPercent,
} from "../utils/formatters.js";

const { Text } = Typography;

function compareNumbers(field) {
    return (a, b) => (a[field] ?? 0) - (b[field] ?? 0);
}

function renderCoinName(_, coin) {
    return (
        <Flex align="center" gap={10}>
            <Avatar size={28} src={coin.image} alt={coin.name} />
            <Flex vertical gap={0}>
                <Text strong>{coin.name}</Text>
                <Text type="secondary">{coin.symbol?.toUpperCase()}</Text>
            </Flex>
        </Flex>
    );
}

function renderPercent(value) {
    const type = value >= 0 ? "success" : "danger";

    return <Text type={type}>{formatSignedPercent(value)}</Text>;
}

const columns = [
    {
        title: "#",
        dataIndex: "market_cap_rank",
        width: 72,
        sorter: compareNumbers("market_cap_rank"),
    },
    {
        title: "Coin",
        dataIndex: "name",
        width: 260,
        render: renderCoinName,
    },
    {
        title: "Price",
        dataIndex: "current_price",
        align: "right",
        width: 140,
        sorter: compareNumbers("current_price"),
        render: formatCurrency,
    },
    {
        title: "24h %",
        dataIndex: "price_change_percentage_24h",
        align: "right",
        width: 120,
        sorter: compareNumbers("price_change_percentage_24h"),
        render: renderPercent,
    },
    {
        title: "Market Cap",
        dataIndex: "market_cap",
        align: "right",
        width: 160,
        sorter: compareNumbers("market_cap"),
        render: formatCompactCurrency,
    },
    {
        title: "Volume 24h",
        dataIndex: "total_volume",
        align: "right",
        width: 160,
        sorter: compareNumbers("total_volume"),
        render: formatCompactCurrency,
    },
];

function CoinsTable({ coins = [], loading = false, pagination = false }) {
    return (
        <Table
            columns={columns}
            dataSource={coins}
            locale={{ emptyText: <EmptyState description="No market data available" height={240} /> }}
            loading={loading}
            pagination={pagination}
            rowKey="id"
            scroll={{ x: "max-content", y: 560 }}
            size="middle"
            sticky
        />
    );
}

export default CoinsTable;
