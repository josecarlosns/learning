import InvestmentCalculatorLogo from './../assets/investment-calculator-logo.png';

export default function Header() {
  return (
    <header id="header">
      <img src={InvestmentCalculatorLogo} alt="Logo" />
      <h1>Investment Calculator</h1>
    </header>
  );
}
