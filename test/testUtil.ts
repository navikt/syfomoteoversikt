import { ReactWrapper } from "enzyme";
import { expect } from "chai";

export const daysFromToday = (days: number): Date => {
  const nyDato = new Date();
  nyDato.setDate(nyDato.getDate() + days);
  return new Date(nyDato);
};

export const assertColumns = (
  row: ReactWrapper,
  expectedColumns: string[]
): void => {
  const columns = row.find("td");
  expectedColumns.forEach((expected, index) => {
    expect(columns.at(index).text()).to.equal(expected);
  });
};

export const assertTableHeaders = (
  wrapper: ReactWrapper,
  expectedHeaders: string[]
): void => {
  const tableHeaders = wrapper.find("th");
  expectedHeaders.forEach((expected, index) => {
    expect(tableHeaders.at(index).text()).to.equal(expected);
  });
};
