import styled from "styled-components";

export const TruncatedTableColumn = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const VelgMoteHeader = styled.th`
  width: 5%;
`;

export const VelgMoteColumn = styled.td`
  width: 5%;
`;

export const MoteDatoHeader = styled.th`
  width: 14%;
`;

export const MoteDatoColumn = styled.td`
  width: 14%;
`;

export const FnrHeader = styled.th`
  width: 8%;
`;

export const FnrColumn = styled.td`
  width: 8%;
`;

export const StatusHeader = styled.th`
  width: 18%;
`;

export const StatusColumn = styled(TruncatedTableColumn)`
  width: 18%;
`;

export const ResponsHeader = styled.th`
  width: 20%;
`;

export const ResponsColumn = styled(TruncatedTableColumn)`
  width: 20%;
`;
