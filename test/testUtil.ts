import { expect } from "chai";

export const daysFromToday = (days: number): Date => {
  const nyDato = new Date();
  nyDato.setDate(nyDato.getDate() + days);
  return new Date(nyDato);
};

export const assertTableHeaders = (
  headers: HTMLElement[],
  expectedHeaders: string[]
): void => {
  expectedHeaders.forEach((expected, index) => {
    expect(headers[index].textContent).to.equal(expected);
  });
};

export const assertTableRows = (rows: HTMLElement[], expectedRows: string[]) =>
  expectedRows.forEach((expectedRow) =>
    rows.some((row) => row.textContent === expectedRow)
  );
