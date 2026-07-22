/**
 * Format a number as Indonesian Rupiah.
 * Returns "Hubungi Kami" when price is null or undefined.
 */
export function formatRupiah(
  amount: number | null | undefined
): string {
  if (amount === null || amount === undefined) {
    return "Hubungi Kami";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
