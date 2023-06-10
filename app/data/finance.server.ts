import { getProperty } from "./properties.server";

export const calculateInterest = async (
  id: string,
  deposit: number,
  interest: number,
  term: number
) => {
  const property = await getProperty(id);

  // This is totally not how you calculate compound interest 😂
  const loan = property.price - deposit;
  const annualInterest = loan * (interest / 100);
  const totalInterest = annualInterest * term;
  const total = loan + totalInterest;
  const monthlyCost = total / term / 12;

  return monthlyCost;
};
