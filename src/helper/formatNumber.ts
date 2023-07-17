export default function formatNumber(price?: number): string {
  if (price === undefined) {
    return "";
  }

  const numberString = price.toString();
  const decimalIndex = numberString.indexOf(".");

  if (decimalIndex === -1) {
    // No decimal point found
    return numberString;
  } else {
    // Check if there are more than 5 digits on the right-hand side
    if (numberString.length - decimalIndex - 1 > 5) {
      return numberString.substring(0, decimalIndex + 6) + "...";
    } else {
      return numberString;
    }
  }
}
