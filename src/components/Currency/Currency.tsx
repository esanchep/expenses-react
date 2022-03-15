function toEuropeanFormat(amount: number): string {
  return amount.toLocaleString('es-ES', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function Currency({ amount }: { amount: number }): JSX.Element {
  // TODO get the locale from browser
  return (<>{toEuropeanFormat(amount)} €</>)
}

export default Currency;