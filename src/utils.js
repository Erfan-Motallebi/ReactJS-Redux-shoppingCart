export default function currencyFormat(num) {
  return "$" + parseInt(num.toFixed(1)).toLocaleString();
}
