import { useState } from 'react';
import Input from './Input';
import { calculateInvestmentResults } from '../util/investment';

const DEFAULT_VALUES = {
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: 0,
  duration: 0,
};

export default function Calculator({
  onCalculatedReturn,
  initialValues = DEFAULT_VALUES,
}) {
  let values = initialValues;

  function handleChange({ key, value }) {
    values[key] = parseFloat(value, 10);

    const calculatedReturn = calculateInvestmentResults(values);

    onCalculatedReturn(calculatedReturn);
  }

  return (
    <div id="user-input">
      <div className="input-group">
        <Input
          id="initial-investment"
          label="Initial Investment"
          type="number"
          onChange={({ value }) =>
            handleChange({ key: 'initialInvestment', value })
          }
          initialValue={initialValues.initialInvestment}
        />
        <Input
          id="annual-investment"
          label="Annual Investment"
          type="number"
          onChange={({ value }) =>
            handleChange({ key: 'annualInvestment', value })
          }
          initialValue={initialValues.annualInvestment}
        />
      </div>
      <div className="input-group">
        <Input
          id="expected-return"
          label="Expected Return (% per year)"
          type="number"
          onChange={({ value }) =>
            handleChange({ key: 'expectedReturn', value })
          }
          initialValue={initialValues.expectedReturn}
        />
        <Input
          id="duration"
          label="Duration (in years)"
          type="number"
          onChange={({ value }) => handleChange({ key: 'duration', value })}
          initialValue={initialValues.duration}
        />
      </div>
    </div>
  );
}
