import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  margin-right: auto;
  margin-left: auto;
  padding-left: 8px;
  padding-right: 8px;
  width: 95%;
`;

export const Row = styled.div`
  box-sizing: border-box;
  margin-left: -8px;
  margin-right: -8px;
`;

export const Column = styled.div`
  flex-direction: column;
  box-sizing: border-box;
`;

export const RowCentered = styled(Row)`
  display: flex;
  justify-content: center;
`;
