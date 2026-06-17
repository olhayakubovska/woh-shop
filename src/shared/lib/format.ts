export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("uk-UA").format(value)} ₴`;
}
