export function formatCurrency(value: number, currency: string = "COP") {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currency
  }).format(value);
}

export function calculateTotalValue(
  status: string,
  origin: string,
  dollar_cop: number,
  price_usd: number,
  price_cop: number
) {
  if (origin === "importado") {
    if (status === "nuevo") {
      return formatCurrency(dollar_cop * price_usd + 100000);
    } else {
      return formatCurrency(dollar_cop * price_usd * 80000);
    }
  } else {
    return formatCurrency(price_cop);
  }
}
