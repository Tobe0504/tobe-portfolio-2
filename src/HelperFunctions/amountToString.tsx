export function formatAmountWithCommas(
  amount: string | undefined | number
): string | undefined {
  if (amount) {
    const amountNumber = Number(amount);
    const parts = amountNumber.toFixed(4).split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const decimalPart = parts[1] ? `.${parts[1]}` : "";
    return `${integerPart}${decimalPart}`;
  } else {
    return "0.00";
  }
}

export function formatAmountWithCommas2dp(
  amount: string | undefined | number
): string | undefined {
  if (amount) {
    const amountNumber = Number(amount);
    const parts = amountNumber.toFixed(2).split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const decimalPart = parts[1] ? `.${parts[1]}` : "";
    return `${integerPart}${decimalPart}`;
  } else {
    return "0.00";
  }
}

export const formatCurrency = (value: string | number) => {
  if (typeof value === "string") {
    value = value.replace(/,/g, "");
  }

  const numericValue = parseFloat(value as string);

  if (isNaN(numericValue)) {
    return "";
  }

  return numericValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

console.log(formatCurrency(100000.0), "utils");
