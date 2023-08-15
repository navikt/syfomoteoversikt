import styled, { css } from "styled-components";

export const Motetabell = styled.table`
  margin-bottom: 2em;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const thStyle = css`
  border-bottom: 0.125em solid #efefef;
  color: white;
  background: var(--a-gray-800);
  text-align: left;
  padding: 1em;
  font-size: 0.875em;
  line-height: 1.35em;
  font-weight: 400;
`;

const tdStyle = css`
  border-bottom: 0.125em solid #efefef;
  padding: 1em;
  background: white;
`;

export const TH = styled.th`
  ${thStyle}
`;

export const TruncatedTableColumn = styled.td`
  ${tdStyle};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const VelgMoteHeader = styled.th`
  ${thStyle};
  width: 5%;
`;

export const VelgMoteColumn = styled.td`
  ${tdStyle};
  width: 5%;
`;

export const MoteDatoHeader = styled.th`
  ${thStyle};
  width: 14%;
`;

export const MoteDatoColumn = styled.td`
  ${tdStyle};
  width: 14%;
`;

export const FnrHeader = styled.th`
  ${thStyle};
  width: 8%;
`;

export const FnrColumn = styled.td`
  ${tdStyle};
  width: 8%;
`;

export const StatusHeader = styled.th`
  ${thStyle};
  width: 18%;
`;

export const StatusColumn = styled(TruncatedTableColumn)`
  width: 18%;
`;

export const ResponsHeader = styled.th`
  ${thStyle};
  width: 20%;
`;

export const ResponsColumn = styled(TruncatedTableColumn)`
  width: 20%;
`;
