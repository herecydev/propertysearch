// Keeping this as a constant so we don't need to keep recreating it each time a component renders
export const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
