// This function expects a JS object as an argument
// The object should contain the following properties
// - initialInvestment: The initial investment amount
// - annualInvestment: The amount invested every year
// - expectedReturn: The expected (annual) rate of return
// - duration: The investment duration (time frame)
export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
}) {
  const annualData = [];
  
  // Fix for the NaN bug
  const initialInvestmentValue = initialInvestment || 0;
  const annualInvestmentValue = annualInvestment || 0;
  const expectedReturnValue = expectedReturn || 0;

  let investmentValue = initialInvestmentValue;
  let totalInterest = 0;

  for (let i = 0; i < duration; i++) {
    const year = i + 1;
    const interestEarnedInYear = investmentValue * (expectedReturnValue / 100);
    investmentValue += interestEarnedInYear + annualInvestmentValue;
    annualData.push({
      year, // year identifier
      investmentValue, // investment value at end of year
      interest: interestEarnedInYear, // the amount of interest earned in this year
      totalInterest: (totalInterest += interestEarnedInYear), // total interest
      investedCapital: annualInvestmentValue * year + initialInvestmentValue, // total invested capital
    });
  }

  return annualData;
}

// The browser-provided Intl API is used to prepare a formatter object
// This object offers a "format()" method that can be used to format numbers as currency
// Example Usage: formatter.format(1000) => yields "$1,000"
export const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
