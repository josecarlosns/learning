import { INITIAL_RESULTS } from '../assets/data';
import { formatter } from '../util/investment';

export default function ResultsTable({ results }) {
  return (
    <table id="result" className='text-left'>
      <tr>
        <th>{'Year'}</th>
        <th>{'Investment Value'}</th>
        <th>{'Interest (Year)'}</th>
        <th>{'Total Interest'}</th>
        <th>{'Invested Capital'}</th>
      </tr>
      {results &&
        results.length > 0 &&
        results.map(
          ({
            year,
            investmentValue,
            interest,
            totalInterest,
            investedCapital,
          }) => (
            <tr>
              <th>{year}</th>
              <th>{formatter.format(investmentValue)}</th>
              <th>{formatter.format(interest)}</th>
              <th>{formatter.format(totalInterest)}</th>
              <th>{formatter.format(investedCapital)}</th>
            </tr>
          ),
        )}
    </table>
  );
}
