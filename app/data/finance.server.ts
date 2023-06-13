export const calculateInterest = (
  cost: number,
  deposit: number,
  interest: number,
  term: number
) => {
  const loan = cost - deposit;

  if (loan < 0) {
    return 0;
  }

  const numberOfPayments = term * 12;
  const interestPerMonth = interest / 100 / 12;
  const totalInterest = Math.pow(1 + interestPerMonth, numberOfPayments);

  return loan * ((interestPerMonth * totalInterest) / (totalInterest - 1));
};
