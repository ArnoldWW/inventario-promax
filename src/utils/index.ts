export default function formatCurrency(
  value: number,
  currency: string = "COP"
) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currency
  }).format(value);
}
