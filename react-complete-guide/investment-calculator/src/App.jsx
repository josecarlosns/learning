import { useState } from 'react';
import Calculator from './components/Calculator';
import Header from './components/Header';
import ResultsTable from './components/ResultsTable';
import { INITIAL_CALCULATOR_VALUES, INITIAL_RESULTS } from './assets/data';

export default function App() {
  const [results, setResults] = useState(INITIAL_RESULTS);

  function handleCalculatedReturn(calculatedValues) {
    setResults(calculatedValues);
  }

  return (
    <>
      <Header />
      <Calculator
        onCalculatedReturn={handleCalculatedReturn}
        initialValues={INITIAL_CALCULATOR_VALUES}
      />
      <ResultsTable results={results} />
    </>
  );
}
