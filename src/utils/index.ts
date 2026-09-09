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
      return dollar_cop * price_usd + 100000;
    } else {
      return dollar_cop * price_usd + 80000;
    }
  } else {
    return price_cop;
  }
}

export function formatDate(date: string) {
  return new Date(date).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    dateStyle: "short",
    timeStyle: "short"
  });
}

export function maskText(text: string, maskChar: string = "*") {
  return text.slice(-4).padStart(String(text).length, maskChar);
}
