import { Avatar, Flex, Table, Typography } from "antd";

const { Text } = Typography;

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

function formatCurrency(value) {
    if (!Number.isFinite(value)) {
        return "-";
    }

    return currencyFormatter.format(value);
}

function formatCompactCurrency(value) {
    if (!Number.isFinite(value)) {
        return "-";
    }

    return compactCurrencyFormatter.format(value);
}

function formatPercent(value) {
    if (!Number.isFinite(value)) {
        return "-";
    }

    return `${percentFormatter.format(value)}%`;
}

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

    return <Text type={type}>{formatPercent(value)}</Text>;
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

function CoinsTable({ coins = [], loading = false }) {
    return (
        <Table
            columns={columns}
            dataSource={coins}
            loading={loading}
            pagination={false}
            rowKey="id"
            scroll={{ x: 912, y: 560 }}
            size="middle"
            sticky
        />
    );
}

export default CoinsTable;
