export const calculateInterest = async (
  cost: number,
  deposit: number,
  interest: number,
  term: number
) => {
  // This is totally not how you calculate compound interest 😂
  const loan = cost - deposit;

  if (loan < 0) {
    return 0;
  }

  const annualInterest = loan * (interest / 100);
  const totalInterest = annualInterest * term;
  const total = loan + totalInterest;
  const monthlyCost = total / term / 12;

  return monthlyCost;
};
