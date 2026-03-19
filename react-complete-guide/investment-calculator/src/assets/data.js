import { calculateInvestmentResults } from '../util/investment';

export const INITIAL_CALCULATOR_VALUES = {
  initialInvestment: 1000,
  annualInvestment: 6000,
  expectedReturn: 5,
  duration: 10,
};

export const INITIAL_RESULTS = calculateInvestmentResults(INITIAL_CALCULATOR_VALUES);
