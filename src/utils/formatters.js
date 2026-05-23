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

const signedPercentFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
});

export function formatCurrency(value) {
    if (!Number.isFinite(value)) {
        return "-";
    }

    return currencyFormatter.format(value);
}

export function formatCompactCurrency(value) {
    if (!Number.isFinite(value)) {
        return "-";
    }

    return compactCurrencyFormatter.format(value);
}

export function formatSignedPercent(value) {
    if (!Number.isFinite(value)) {
        return "-";
    }

    return `${signedPercentFormatter.format(value)}%`;
}
